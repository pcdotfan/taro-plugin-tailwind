import { IPluginContext } from '@tarojs/service';
import {
    CURRENT_PLATFORM,
    HIDDEN_CONFIG_PATH,
    SUPPORTED_MINI_PLATFORMS,
    SUPPORTED_PLATFORMS,
} from './constant';
import path from 'path';
import fs from 'fs';
import registerInitCommand from './init';

interface ITaroPluginTailwindOptions {
    test?: RegExp;
}

const getConfigPath = platform => `${HIDDEN_CONFIG_PATH}/${platform}.config.js`;
const checkPlatformConfigExists = platform => fs.existsSync(path.resolve(getConfigPath(platform)));

export default (
    ctx: IPluginContext,
    { test = /\/src\/tailwind\.src\.css$/ }: ITaroPluginTailwindOptions
) => {
    registerInitCommand(ctx);
    if (!SUPPORTED_PLATFORMS.includes(CURRENT_PLATFORM)) {
        ctx.helper.chalk.yellowBright(
            `⚠️ [taro-plugin-tailwind]: platform ${CURRENT_PLATFORM} is not supported, auto skipping...`
        );
        return;
    }
    if (!['h5', 'mini'].some(platform => checkPlatformConfigExists(platform))) {
        ctx.helper.chalk.yellowBright(
            `⚠️ [taro-plugin-tailwind]: required config (h5.config.js / mini.config.js) is missing, auto skipping...`
        );
        return;
    }
    const postcssConfig = {
        mini: {
            plugins: [
                ['postcss-import', {}],
                [
                    'tailwindcss',
                    {
                        config: getConfigPath(
                            checkPlatformConfigExists(CURRENT_PLATFORM) ? CURRENT_PLATFORM : 'mini'
                        ),
                    },
                ],
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
                                            SUPPORTED_MINI_PLATFORMS.includes(CURRENT_PLATFORM)
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
