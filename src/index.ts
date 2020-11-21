import { IPluginContext } from '@tarojs/service';
import { HIDDEN_CONFIG_PATH, SUPPORTED_MINI_PLATFORMS, SUPPORTED_PLATFORMS } from './constant';
import path from 'path';
import fs from 'fs';

interface ITaroPluginTailwindOptions {
    test?: RegExp;
}

const getConfigPath = platform => {
    const filePath = `${HIDDEN_CONFIG_PATH}/${platform}.config.js`;
    const targetFile = path.resolve(filePath);
    return fs.existsSync(targetFile) ? filePath : getConfigPath('mini');
};

export default (
    ctx: IPluginContext,
    { test = /\/src\/tailwind\.src\.css$/ }: ITaroPluginTailwindOptions
) => {
    const currentPlatform = process.env.TARO_ENV || 'unsupported';
    if (!SUPPORTED_PLATFORMS.includes(currentPlatform)) {
        ctx.helper.chalk.yellowBright(
            `⚠️ [taro-plugin-tailwind]: Platform ${currentPlatform} is not supported, auto skipping...`
        );
        return;
    }
    const postcssConfig = {
        mini: {
            plugins: [
                ['postcss-import', {}],
                ['tailwindcss', { config: getConfigPath(currentPlatform) }],
                ['postcss-discard-empty', {}],
                ['postcss-unprefix', {}],
                ['postcss-css-variables', {}],
                ['postcss-preset-env', {}],
            ],
        },
        h5: {
            plugins: [
                ['postcss-import', {}],
                ['tailwindcss', { config: getConfigPath('h5') }],
                ['postcss-preset-env', {}],
            ],
        },
    };
    ctx.modifyWebpackChain(({ chain }) => {
        chain.merge({
            module: {
                rule: {
                    taroTailwindLoader: {
                        test,
                        use: [
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions:
                                        postcssConfig[
                                            SUPPORTED_MINI_PLATFORMS.includes(currentPlatform)
                                                ? 'mini'
                                                : 'h5'
                                        ],
                                },
                            },
                        ],
                    },
                },
            },
        });
    });
};
