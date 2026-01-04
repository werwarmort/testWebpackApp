import webpack, { RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(process.cwd(), 'src'),
    };

    config.resolve.modules.push(paths.src);
    config.resolve.extensions.push('.ts', '.tsx');

    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
        // отключаем встроенный в сторибук обработчик svg
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    // добавляем правило для обработки svg через @svgr/webpack
    config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    // добавляем наш загрузчик для css модулей
    config.module.rules.push(buildCssLoader(true, paths));

    return config;
};
