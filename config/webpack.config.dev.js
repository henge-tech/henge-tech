var path = require('path');
var webpack = require('webpack');
var loadenv = require('node-env-file');

var dotenv = loadenv(__dirname + '/../.env.development', {raise: false});
dotenv.NODE_ENV = 'development';

var devPort = dotenv.DEVSERVER_PORT;
if (!devPort) {
  devPort = 8080;
}

module.exports = {
  mode: 'development',
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
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        ]
      }
    ]
  },

  devServer: {
    host: '0.0.0.0',
    port: devPort,
    contentBase: 'docs',
  },
}
