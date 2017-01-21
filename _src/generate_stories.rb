#! /usr/bin/env ruby

require 'json'

file = ARGV[0];
source = File.readlines(file);
patterns = []
pattern = nil
data = {}
source.each do |line|
  line.strip!
  next if line.empty?
  if line =~ /^# [\d\.\s]*([a-z_]+)/
    pattern = $1
  else
    data[pattern] ||= []
    data[pattern] << line
  end
end

data.each do |pattern, lines|
  file = File.expand_path("../docs/stories/ja/#{pattern}.json", File.dirname(__FILE__))
  File.open(file, 'w') do |io|
    io << JSON.pretty_generate(lines)
  end
end

file = File.expand_path("../docs/stories/ja/index.json", File.dirname(__FILE__))

File.open(file, 'w') do |io|
  io << JSON.pretty_generate(data.keys.sort)
end
