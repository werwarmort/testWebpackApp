import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildPaths } from '../types/config';

export function buildCssLoader( isDev: boolean, paths: BuildPaths  ) {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev ? "'[path]_[name]_[local]--[hash:base64:5]" : '[hash:base64:8]',
          },
        },
      },
      // Compiles Sass to CSS
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: [paths.src],
          },
          additionalData: `@use "${paths.src}/1_App/styles/variables/defaultMixins.scss" as *;`,
        },
      },
    ],
  };
}
