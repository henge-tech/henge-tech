var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    CircleApp: './src/CircleApp.jsx',
    CircleIndexApp: './src/CircleIndexApp.jsx',
  },

  output: {
    path: path.join(__dirname, '../docs'),
    filename: '[name].bundle.js'
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
