#! /usr/bin/env ruby

require 'yaml'
require 'erb'

class Generator
  PROJECT_ROOT = File.expand_path('../..', __FILE__)
  CIRCLES_DIR = File.expand_path(ARGV[0])
  HTML_DIR = 'docs/circles'

  def execute
    Dir.chdir(PROJECT_ROOT)

    src_files = []

    erb_src = File.read(File.join('_src/templates/circle.html.erb'))
    erb = ERB.new(erb_src, nil, '-')

    idx = 0
    Dir.glob(File.join(CIRCLES_DIR, '*.yml')) do |file|
      idx += 1
      words = YAML.load(File.read(file))
      pattern = File.basename(file, '.yml')
      html_file = File.join(HTML_DIR, "#{pattern}.html")
      File.open(html_file, 'w') do |out|
        out << erb.result(binding)
      end
    end
  end
end

Generator.new.execute
