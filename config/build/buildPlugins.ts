import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import {BuildOptions} from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildPlugins ({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {

  return [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css", // для разбиения файла на чанки, которые потом будут асинхронно подгружаться
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    })
  ]
}

