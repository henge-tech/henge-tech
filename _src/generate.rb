#! /usr/bin/env ruby

require 'yaml'
require 'erb'
require 'optparse'
require 'json'

class Generator
  PROJECT_ROOT = File.expand_path('../..', __FILE__)

  def initialize
    @command = ARGV.shift
    @data_root = File.expand_path(ARGV.shift)
  end

  def execute
    if @command == 'index'
      generate_index
    elsif @command == 'circles'
      generate_circles
    elsif @command == 'stories'
      generate_stories
    end
  end

  def all_circles
    return @all_circles if @all_circles

    circles = []
    pickup_file = File.join(@data_root, 'data/pickup.yml')
    pickups = YAML.load(File.read(pickup_file))

    glob_pattern = File.join(@data_root, 'data/circles/*.yml')

    Dir.glob(glob_pattern).each_with_index do |file, i|
      words = YAML.load(File.read(file))
      pattern = File.basename(file, '.yml')
      circles << {
        id: i + 1,
        pattern: pattern,
        words: words,
        pickup: pickups.include?(pattern)
      }
    end
    @all_circles = circles
  end

  def generate_circles
    circle_erb = File.expand_path('_src/templates/circle.html.erb', PROJECT_ROOT)
    html_dir = File.expand_path('docs/circles', PROJECT_ROOT)
    image_data = YAML.load(File.read(File.expand_path('data/images.yml', @data_root)))
    image_exts = {}
    image_data.each do |word, entries|
      entries.each do |entry|
        image_exts[word] ||= []
        image_exts[word] << entry['ext']
      end
    end

    erb = ERB.new(File.read(circle_erb), nil, '-')

    idx = 0
    circles = all_circles
    circles.each do |circle|
      idx = circle[:id]
      pattern = circle[:pattern]
      words = circle[:words]

      html_file = File.join(html_dir, "#{pattern}.html")
      File.open(html_file, 'w') do |out|
        out << erb.result(binding)
      end
    end
  end

  def generate_index
    index_erb = File.expand_path('_src/templates/index.html.erb', PROJECT_ROOT)
    erb = ERB.new(File.read(index_erb), nil, '-')

    circles = all_circles
    all_words = circles.inject([]) do |arr, circle|
      arr << circle[:words]
    end

    html_file = File.join(PROJECT_ROOT, 'docs/circles/index.html')
    all_words_json = JSON.dump(all_words)
    File.open(html_file, 'w') do |out|
      out << erb.result(binding)
    end
  end

  def all_stories(lang)
    file = File.join(@data_root, "data/stories/#{lang}.txt")

    source = File.readlines(file)

    data = {}
    pattern = nil
    pattern_id = nil

    source.each do |line|
      line.strip!
      next if line.empty?
      if line =~ /^# (\d+)\.\s*([a-z_]+)/
        pattern = $2
        data[pattern] = {
          id: $1.to_i,
          lines: [],
        }
      else
        data[pattern][:lines] << line
      end
    end

    data.each do |pattern, data|
      puts "WARN: #{pattern} #{data[:lines].length}" if data[:lines].length != 4
    end

    data
  end

  def generate_stories
    lang = ARGV.shift
    stories = all_stories(lang)

    stories.each do |pattern, data|
      file = File.join(PROJECT_ROOT, "docs/stories/ja/#{pattern}.json")
      File.open(file, 'w') do |io|
        io << JSON.pretty_generate(data[:lines])
      end
    end

    file = File.join(PROJECT_ROOT, 'docs/stories/ja/index.json')
    File.open(file, 'w') do |io|
      io << JSON.dump(stories.keys.sort)
    end

    circles = all_circles
    all_words = circles.inject([]) { |a, circle| a << circle[:words] }
    all_words_json = JSON.dump(all_words)

    file = File.join(PROJECT_ROOT, 'docs/stories/ja/index.html')
    erb_src = File.join(PROJECT_ROOT, '_src/templates/stories.html.erb')
    erb = ERB.new(File.read(erb_src), nil, '-')

    File.open(file, 'w') do |io|
      io << erb.result(binding)
    end

  end
end

Generator.new.execute
