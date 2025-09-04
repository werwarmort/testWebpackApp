import {BuildOptions} from "./types/config";
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export function buildDevServer(options: BuildOptions): DevServerConfiguration {

  return {
    port: options.port,
    open: true,
    historyApiFallback: true, // проксирование запросов через корневую страницу, чтобы не было ошибки 404 на документ
  }
}