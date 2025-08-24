const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].[contenthash].js',
    clean: true,
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: peth.resolve(__dirname, 'public', 'index.html'),
    }),
    new HTMLWebpackPlugin(),
    new webpack.ProgressPlugin(),
  ]
}