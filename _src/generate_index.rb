#! /usr/bin/env ruby

require 'yaml'
require 'erb'
require 'json'

class IndexGenerator
  PROJECT_ROOT = File.expand_path('../..', __FILE__)
  CIRCLES_DATA_DIR = File.expand_path(ARGV[0])
  HTML_DIR = 'docs/circles'

  def execute
    Dir.chdir(PROJECT_ROOT)

    src_files = []

    erb_src = File.read('_src/templates/index.html.erb')
    erb = ERB.new(erb_src, nil, '-')

    idx = 0
    circles = []

    all_words = [];
    pickups = YAML.load(File.read(File.join(CIRCLES_DATA_DIR, 'pickup.yml')))
    Dir.glob(File.join(CIRCLES_DATA_DIR, 'circles/*.yml')) do |file|
      idx += 1
      words = YAML.load(File.read(file))
      all_words << words
      pattern = File.basename(file, '.yml')
      circles << {pattern: pattern, count: words.length, pickup: pickups.include?(pattern)}
    end

    html_file = File.join(HTML_DIR, 'index.html')
    all_words_json = JSON.dump(all_words)
    File.open(html_file, 'w') do |out|
      out << erb.result(binding)
    end
  end
end

IndexGenerator.new.execute
