const path = require('path')

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].[contenthash].js',
    clean: true,
    path: path.resolve(__dirname, 'build')
  }
}