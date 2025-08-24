import webpack from "webpack";

export function buildLoaders(): webpack.RuleSetRule[] {

  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  return [  // конфигурация "лоадеров". Они нужны для обработки файлов, которые выходят за рамки js (png, jpg, gif)
    typeScriptLoader,
  ]
}