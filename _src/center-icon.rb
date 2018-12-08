#! /usr/bin/env ruby

class CenterIconGenerator

  def execute
    root = File.expand_path('../docs/imgs/center', __dir__)

    [12, 16].each do |amount|
      amount.times do |i|
        file = File.join(root, "#{amount}-#{i}.svg")
        File.open(file, 'w') do |io|
          # io << svg(12, 360 / 12.0, 50.0, 23.5, 1.6, i)
          io << svg(amount, 360.0 / amount, 45.0, 20, 1.8, i, false)
        end
      end
    end
    12.times do |i|
      file = File.join(root, "floor-#{i}.svg")
      File.open(file, 'w') do |io|
        # io << svg(12, 360 / 12.0, 50.0, 23.5, 1.6, i)
        io << svg(12, 360 / 12, 56.0, 26, 1.8, i, true)
      end
    end

    puts "DONE"
  end

  def svg(amount, angle, size, r, cr, pos, skip_gray)
    result = %{<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="#{size}" height="#{size}">}

    o = size / 2
    amount.times do |i|
      next if skip_gray && i != pos
      a = i * angle
      x = o + r * Math::cos((a - 90) * (Math::PI / 180))
      y = o + r * Math::sin((a - 90) * (Math::PI / 180))
      # color = i == pos ? '#f00' : '#000'
      color = !skip_gray && i == pos ? '#000' : '#ccc'

      result += %{<circle cx="#{"%.2f" % x}" cy="#{"%.2f" % y}" r="#{cr}" fill="#{color}" />}
    end

    result += '</svg>'
  end
end

CenterIconGenerator.new.execute
