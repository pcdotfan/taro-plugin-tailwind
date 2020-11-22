import { IPluginContext } from '@tarojs/service';
import {
    HIDDEN_CONFIG_PATH,
    CURRENT_PLATFORM,
    SUPPORTED_MINI_PLATFORMS,
    SUPPORTED_PLATFORMS,
} from './constant';

const fs = require('fs-extra');
const path = require('path');

const getConfigPath = platform => `${HIDDEN_CONFIG_PATH}/${platform}.config.js`;
const checkConfigExists = platform => fs.existsSync(path.resolve(getConfigPath(platform)));

export default (ctx: IPluginContext, test) => {
    ctx.modifyWebpackChain(({ chain }) => {
        if (!SUPPORTED_PLATFORMS.includes(CURRENT_PLATFORM)) {
            console.log(
                ctx.helper.chalk.yellowBright(
                    `⚠️ [taro-plugin-tailwind]: platform ${CURRENT_PLATFORM} is not supported, auto skipping...`
                )
            );
            return;
        }
        if (!['h5', 'mini'].some(platform => checkConfigExists(platform))) {
            console.log(
                ctx.helper.chalk.yellowBright(
                    `⚠️ [taro-plugin-tailwind]: required config (h5.config.js / mini.config.js) is missing, auto skipping...`
                )
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
                                checkConfigExists(CURRENT_PLATFORM) ? CURRENT_PLATFORM : 'mini'
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
                    ['autoprefixer', {}],
                ],
            },
        };
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
