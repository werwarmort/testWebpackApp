import webpack from "webpack";

export function buildLoaders(): webpack.RuleSetRule[] {

  const cssLoadrs = {
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader",
        // Compiles Sass to CSS
        "sass-loader",
      ],
    }

  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  return [  // конфигурация "лоадеров". Они нужны для обработки файлов, которые выходят за рамки js (png, jpg, gif)
    typeScriptLoader,
    cssLoadrs,
  ]
}