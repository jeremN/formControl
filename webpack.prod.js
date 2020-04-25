const webpack = require('webpack')
const path = require('path')
const PUBLIC_PATH = path.resolve(__dirname, 'dist')
require('babel-polyfill')

module.exports = {
  entry: ['babel-polyfill', './src/scripts/form-control.js'],
  output: {
    filename: 'form-control.js',
    path: PUBLIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  }
}
