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

  def encode_s3_key(str)
    str.gsub(/[^-a-zA-Z0-9]/) {|c| '_' + c.ord.to_s(16).upcase }
  end

  def load_images_yaml
    image_data = YAML.load(File.read(File.expand_path('data/images.yml', @data_root)))
    image_data.each do |word, entries|
      image_base = encode_s3_key(word)

      entries.each.with_index do |entry, i|
        file = "#{ image_base }."
        file += "#{ i }." if i > 0
        file += entry['ext']
        entry['image'] = file
      end
    end
    image_data
  end

  def load_template(file_name)
    erb_file = File.expand_path("_src/templates/#{file_name}", PROJECT_ROOT)
    ERB.new(File.read(erb_file), nil, '-')
  end

  def generate_floors
    circles = all_circles
    image_data = load_images_yaml

    # How many circles in the floor
    # 12 * 82 + 16 = 1,000
    floor_circles_num = [12] * 82 + [16]

    floor_erb = load_template('floor.html.erb')
    credit_erb = load_template('credit.html.erb')
    floors_index_erb = load_template('floors.html.erb')

    all_floors_data = []
    floor_circles_num.each.with_index do |circle_num, i|
      fd = create_floor_data(circles.shift(circle_num), image_data, i + 1)
      all_floors_data << fd
    end
    floor_links = credit_floor_links(all_floors_data)

    all_floors_data.each do |floor_data|
      save_floor_json(floor_data)
      save_floor_html(floor_erb, floor_data)
      save_credit_html(credit_erb, floor_data, image_data, floor_links)
    end

    first_circles = all_floors_data.map {|fd| fd[:first_circle]}
    save_floors_index_html(floors_index_erb, first_circles)
  end

  def save_floor_json(floor_data)
    floor_num = floor_data[:floor_num]
    json = {
      'floor' => floor_num,
      'circles' => floor_data[:circles]
    }
    file = File.expand_path("docs/floors/#{floor_num}.json", PROJECT_ROOT)
    File.open(file, 'w') do |out|
      out << JSON.dump(json)
    end
  end

  def save_floor_html(erb, floor_data)
    file = File.expand_path("docs/floors/#{floor_data[:floor_num]}.html", PROJECT_ROOT)
    File.open(file, 'w') do |out|
      out << erb.result(binding)
    end
  end

  def save_credit_html(erb, floor_data, image_data, floor_links)

    file = File.expand_path("docs/credits/#{floor_data[:floor_num]}.html", PROJECT_ROOT)
    File.open(file, 'w') do |out|
      out << erb.result(binding)
    end
  end

  def credit_floor_links(all_floors_data)
    result = []
    7.times do |tower|
      links = []
      result << links

      12.times do |tf|
        f = tower * 12 + tf + 1
        break if f > 83

        image_completed = all_floors_data[f - 1][:first_circle][:image_completed]

        data = {:floor_num => f, :image_completed => image_completed}
        links << data
      end
    end
    result
  end

  def save_floors_index_html(erb, first_circles)
    file = File.expand_path('docs/floors/index.html', PROJECT_ROOT)
    File.open(file, 'w') do |out|
      out << erb.result(binding)
    end
  end

  def create_floor_data(floor_circles, image_data, floor_num)
    image_completed = true
    image_exists = false

    # the camel case is for JSON key
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
      first_circle_data[:image_completed] = true
    elsif image_exists
      first_circle_data[:image_completed] = false
    else
      first_circle_data[:image_completed] = nil
    end

    first_circle = floor_circles[0]
    first_word = first_circle[:words][0]
    first_exts = first_circle[:imageExts][0]
    first_circle_data[:pattern] = first_circle[:pattern]
    first_circle_data[:image] = encode_s3_key(first_word) + '.' + first_exts[0] if first_exts

    {
      :floor_num => floor_num,
      :circles => floor_circles,
      :first_circle => first_circle_data,
    }
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
