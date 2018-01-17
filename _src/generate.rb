#! /usr/bin/env ruby

require 'yaml'
require 'erb'
require 'optparse'
require 'json'
require 'awesome_print'

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
    elsif @command == 'floors'
      generate_floors
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

  def generate_floors
    circles = all_circles
    image_data = YAML.load(File.read(File.expand_path('data/images.yml', @data_root)))

    # 12 * 82 + 16 = 1,000
    floor_circles_num = [12] * 82 + [16]
    first_circles = []

    floor_circles_num.each.with_index do |circle_num, floor_idx|
      floor_circles = circles.shift(circle_num)
      image_completed = true
      image_exists = false

      floor_circles.each do |circle|
        circle[:imageExts] = []
        circle[:words].each do |word|
          if image_data[word]
            circle[:imageExts] << image_data[word].map { |a| a['ext'] }
            image_exists = true
          else
            circle[:imageExts] << nil
            image_completed = false
          end
        end
      end

      first_circle_data = {}
      if image_completed
        first_circle_data[:imageCompleted] = true
      elsif image_exists
        first_circle_data[:imageCompleted] = false
      else
        first_circle_data[:imageCompleted] = nil
      end

      json = {
        'floor' => floor_idx + 1,
        'circles' => floor_circles
      }
      floor_file = File.expand_path("docs/floors/#{floor_idx + 1}.json", PROJECT_ROOT)
      File.open(floor_file, 'w') do |out|
        out << JSON.dump(json)
      end

      first_circle = floor_circles[0]
      first_word = first_circle[:words][0]
      first_exts = first_circle[:imageExts][0]
      first_circle_data[:pattern] = first_circle[:pattern]
      first_circle_data[:image] = "#{first_word}.#{first_exts[0]}" if first_exts
      first_circles << first_circle_data
    end

    floors_erb = File.expand_path('_src/templates/floors.html.erb', PROJECT_ROOT)
    erb = ERB.new(File.read(floors_erb), nil, '-')
    html_file = File.expand_path('docs/floors/index.html', PROJECT_ROOT)

    File.open(html_file, 'w') do |out|
      out << erb.result(binding)
    end
  end

  def generate_circles
    circle_erb = File.expand_path('_src/templates/circle.html.erb', PROJECT_ROOT)
    html_dir = File.expand_path('docs/circles', PROJECT_ROOT)

    erb = ERB.new(File.read(circle_erb), nil, '-')

    idx = 0
    circles = all_circles
    circles.each do |circle|
      circle_num = circle[:id]
      idx = circle_num - 1

      if idx > 983
        floor = 83
        floor_pos = idx - 984
      else
        floor = idx / 12 + 1
        floor_pos = idx % 12
      end

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
end

Generator.new.execute
