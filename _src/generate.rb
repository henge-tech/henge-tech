#! /usr/bin/env ruby

require 'yaml'
require 'erb'
require 'optparse'
require 'json'
require 'awesome_print'
require 'uri'

class Generator
  PROJECT_ROOT = File.expand_path('../..', __FILE__)

  def initialize
    @command = ARGV.shift
    @data_root = File.expand_path(ARGV.shift)
  end

  def execute
    if @command == 'index'
      # Generate /index.html
      generate_index
    elsif @command == 'circles'
      # Generate /circles/*.html
      generate_circles
    elsif @command == 'floors'
      # Generate /floors/*.{html,json} and /credits/*.html
      generate_floors
    elsif @command == 'sentences'
      # Generate /sentences/*.html
      generate_sentences
    end
  end

  def all_circles
    return @all_circles if @all_circles

    circles = []
    pickup_file = File.join(@data_root, 'data/pickup.yml')
    pickups = YAML.load(File.read(pickup_file))

    glob_pattern = File.join(@data_root, 'data/circles/*.yml')

    Dir.glob(glob_pattern).sort.each_with_index do |file, i|
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

  # Generate /index.html
  def generate_index
    index_erb = File.expand_path('_src/templates/index.html.erb', PROJECT_ROOT)
    erb = ERB.new(File.read(index_erb), nil, '-')

    circles = all_circles
    all_words = circles.inject([]) do |arr, circle|
      arr << circle[:words]
    end

    html_file = File.join(PROJECT_ROOT, 'docs/index.html')
    all_words_json = JSON.dump(all_words)
    File.open(html_file, 'w') do |out|
      out << erb.result(binding)
    end
  end

  def all_sentences
    return @all_sentences if @all_sentences

    sentences = []

    floornums = load_pattern_to_floor_map
    glob_pattern = File.join(@data_root, 'data/sentences/*.yml')
    floors = {}

    Dir.glob(glob_pattern).sort.each_with_index do |file, i|
      lines = load_sentence_file(file)
      next unless lines

      pattern = File.basename(file, '.yml')
      images = glob_sentence_images(pattern)

      allwords = YAML.load(File.read(File.join(@data_root, "data/circles/#{pattern}.yml")))
      entry = build_sentence_entry(lines, allwords, images)
      entry[:type] = :circle
      entry[:pattern] = pattern
      entry[:floornum] = floornums[pattern],

      sentences << entry
      floors[floornums[pattern]] ||= []
      floors[floornums[pattern]] << entry
    end
    floors.each do |floornum, entries|
      entries.each do |entry|
        entry[:next] = entries[(entries.index(entry) + 1) % entries.size]
        entry[:prev] = entries[(entries.index(entry) - 1) % entries.size]
      end
    end
    @all_sentences = sentences
  end

  def all_floor_sentences
    return @all_floor_sentences if @all_floor_sentences
    sentences = []
    glob_pattern = File.join(@data_root, 'data/sentences/floors/*.yml')
    Dir.glob(glob_pattern).sort { |a, b| File.basename(a).to_i <=> File.basename(b).to_i }.each_with_index do |file, i|
      lines = load_sentence_file(file)
      next unless lines

      floornum = File.basename(file, '.yml').to_i
      images = glob_sentence_images("#{floornum}")

      allwords = all_floor_words[floornum - 1]
      entry = build_sentence_entry(lines, allwords, images)
      entry[:type] = :floor
      entry[:floornum] = floornum
      sentences << entry
    end
    @all_floor_sentences = sentences
  end

  def all_floor_words
    return @all_floor_words if @all_floor_words
    circles = all_circles
    floors = []
    for i in 0..82
      circlenum = i == 82 ? 16 : 12
      floors << circles[i * 12, circlenum].map { |circle| circle[:words][0] }
    end
    @all_floor_words = floors
  end

  def load_sentence_file(file)
    lines = File.read(file).split(/^--- \|$/, 3).last.split(/\n+/).select { |line| line != '' && line != '@@@' }
    lines.size == 4 ? lines : nil
  end

  def glob_sentence_images(pattern)
    if pattern =~ /\A\d+\z/
      image_files = Dir.glob(File.join(@data_root, "src/images/sentences/floors/#{pattern}-*"))
    else
      image_files = Dir.glob(File.join(@data_root, "src/images/sentences/#{pattern}-*"))
    end
    image_files = image_files.map { |f| File.basename(f) }.sort
    images = []
    image_files.each do |image_file|
      number = image_file.split('-')[1].to_i
      images[number - 1] = image_file
    end
    na = 0
    for i in 0..3
      unless images[i]
        na += 1
        images[i] = 'na.png'
      end
    end
    na == 4 ? nil : images
  end

  def build_sentence_entry(lines, allwords, images)
    unit = allwords.size / 4
    emphasized = []
    urlencoded = []
    for i in 0..3
      n = i * unit
      words = allwords[n..n + unit - 1]
      emphasized[i] = emphasize_words(words, lines[i])
      urlencoded[i] = ERB::Util.url_encode(lines[i])
    end

    return {
      :lines => emphasized,
      :encoded => urlencoded,
      :images => images,
    }
  end

  def emphasize_words(words, line)
    if line =~ /\*/
      line = line.gsub(/\*(.+?)\*/, '<em>\1</em>')
      return line
    end

    patterns = []
    words.each do |word|
      patterns << Regexp.escape(word)
    end
    pattern = patterns.sort_by(&:length).reverse.join('|')
    line = line.gsub(/\b(#{pattern})/i, '<em>\1</em>')
    return line
  end

  def load_pattern_to_floor_map
    glob_pattern = File.join(@data_root, 'data/circles/*.yml')
    basenames = Dir.glob(glob_pattern).sort.map { |f| File.basename(f, '.yml') }
    floors = {}
    basenames.each_with_index do |basename, i|
      if i > 983
        floor = 83
      else
        floor = i / 12 + 1
      end
      floors[basename] = floor
    end
    floors
  end

  def generate_sentences
    erbfile = File.expand_path('_src/templates/sentences.html.erb', PROJECT_ROOT)
    erb = ERB.new(File.read(erbfile), nil, '-')
    sentences = all_sentences
    sentences.each do |sentence|
      type = :circle
      pattern = sentence[:pattern]
      lines = sentence[:lines]
      encoded = sentence[:encoded]
      images = sentence[:images]
      next_entry = sentence[:next]
      prev_entry = sentence[:prev]

      html_file = File.join(PROJECT_ROOT, "docs/sentences/#{pattern}.html")
      File.open(html_file, 'w') do |out|
        out << erb.result(binding)
      end
    end

    sentences = all_floor_sentences
    sentences.each do |sentence|
      type = :floor
      lines = sentence[:lines]
      encoded = sentence[:encoded]
      images = sentence[:images]
      floornum = sentence[:floornum]

      html_file = File.join(PROJECT_ROOT, "docs/sentences/floors/#{floornum}.html")
      File.open(html_file, 'w') do |out|
        out << erb.result(binding)
      end
    end

  end
end

Generator.new.execute
