import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev ? '\'[path]_[name]_[local]--[hash:base64:5]' : '[hash:base64:8]'
          },
        }
      },
      // Compiles Sass to CSS
      "sass-loader",
    ],
  }

  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  const svgrLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }

  const fileLoader = {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    }

  const babelLoader = {
    test: /\.(js|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env'],
        "plugins": [
          [
            "i18next-extract",
            {
              locales: ['ru', 'en'],
              keyAsDefaultValue: true
            }
          ],
        ]
      }
    }
  }


  return [  // конфигурация "лоадеров". Они нужны для обработки файлов, которые выходят за рамки js (png, jpg, gif)
    fileLoader,
    svgrLoader,
    babelLoader,
    typeScriptLoader,
    cssLoader,
  ]
}