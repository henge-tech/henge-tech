var path = require('path');
var webpack = require('webpack');
var loadenv = require("node-env-file");

var dotenv = loadenv(__dirname + '/../.env.development', {raise: false});
dotenv.NODE_ENV = 'development';

module.exports = {
  entry: {
    CircleApp: './src/CircleApp.jsx',
    CircleIndexApp: './src/CircleIndexApp.jsx',
    StoryIndexApp: './src/StoryIndexApp.jsx',
  },

  output: {
    path: path.join(__dirname, '../docs'),
    filename: '[name].bundle.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv)
    })
  ],

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
  },

  devServer: {
    host: '0.0.0.0',
    contentBase: 'docs',
  },
}
