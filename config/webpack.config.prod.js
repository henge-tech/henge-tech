var path = require('path');
var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',

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
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new BundleAnalyzerPlugin({analyzerMode: 'static'})
  ],

  optimization: {
    minimize: true
  },

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
  }
}
