var path = require('path');
var webpack = require('webpack');
var loadenv = require("node-env-file");

var dotenv = loadenv(__dirname + '/../.env.development', {raise: false});
dotenv.NODE_ENV = 'development';

var devPort = dotenv.DEVSERVER_PORT;
if (!devPort) {
  devPort = 8080;
}

module.exports = {
  entry: {
    CircleApp: './src/CircleApp.jsx',
    CircleIndexApp: './src/CircleIndexApp.jsx',
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
    port: devPort,
    contentBase: 'docs',
  },
}
