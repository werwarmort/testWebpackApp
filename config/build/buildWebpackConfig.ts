import {BuildOptions} from "./types/config";
import webpack from "webpack";
import path from "path";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";
import {buildPlugins} from "./buildPlugins";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  return {
    mode: mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      clean: true,
      path: paths.build,
    },
    module: {
      rules: buildLoaders()  ,
    },
    resolve: buildResolvers(),
    plugins: buildPlugins(options),
  }
}