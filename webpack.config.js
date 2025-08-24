import * as path from 'path';
import * as webpack from 'webpack';
import * as HTMLWebpackPlugin from "html-webpack-plugin";

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    filename: '[name].[contenthash].js',
    clean: true,
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [  // конфигурация "лоадеров". Они нужны для обработки файлов, которые выходят за рамки js (png, jpg, gif)
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new HTMLWebpackPlugin(),
    new webpack.ProgressPlugin(),
  ]
}