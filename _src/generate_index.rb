#! /usr/bin/env ruby

require 'yaml'
require 'erb'

class IndexGenerator
  PROJECT_ROOT = File.expand_path('../..', __FILE__)
  CIRCLES_DIR = 'data/circles'
  HTML_DIR = 'circles'

  def execute
    Dir.chdir(PROJECT_ROOT)

    src_files = []

    erb_src = File.read(File.join('_src/templates/index.html.erb'))
    erb = ERB.new(erb_src, nil, '-')

    idx = 0
    circles = []
    Dir.glob(File.join(CIRCLES_DIR, '*.yml')) do |file|
      idx += 1
      words = YAML.load(File.read(file))
      pattern = File.basename(file, '.yml')
      circles << {:pattern => pattern, :count => words.length}
    end

    html_file = File.join(HTML_DIR, 'index.html')
    File.open(html_file, 'w') do |out|
      out << erb.result(binding)
    end

    pickups = YAML.load(File.read('data/pickup.yml'))
    circles = []
    pickups.each do |pattern|
      words = YAML.load(File.read(File.join(CIRCLES_DIR, "#{pattern}.yml")))
      circles << {:pattern => pattern, :count => words.length}
    end

    html_file = File.join(HTML_DIR, 'pickup.html')
    File.open(html_file, 'w') do |out|
      out << erb.result(binding)
    end
  end
end

IndexGenerator.new.execute
