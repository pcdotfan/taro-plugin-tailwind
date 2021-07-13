import { IPluginContext } from "@tarojs/service";
import { ITaroPluginTailwindOptions } from "index";
import WebpackWindiCSSPlugin from "windicss-webpack-plugin";
import {
    HIDDEN_CONFIG_PATH,
    CURRENT_PLATFORM,
    SUPPORTED_PLATFORMS,
    SUPPORTED_MINI_PLATFORMS,
} from "./constant";

const fs = require("fs-extra");
const path = require("path");

const getConfigPath = (platform) =>
    `${HIDDEN_CONFIG_PATH}/${platform}.config.js`;
const checkConfigExists = (platform) =>
    fs.existsSync(path.resolve(getConfigPath(platform)));

export default (ctx: IPluginContext, config: ITaroPluginTailwindOptions) => {
    const requiredConfigFileExists = ["h5", "mini"].some((platform) =>
        checkConfigExists(platform)
    );
    ctx.onBuildStart(() => {
        if (!requiredConfigFileExists) {
            console.log(
                ctx.helper.chalk.yellowBright(
                    `⚠️ [taro-plugin-tailwind]: required config (h5.config.js / mini.config.js) is missing, auto skipping...`
                )
            );
            return;
        }
        if (!SUPPORTED_PLATFORMS.includes(CURRENT_PLATFORM)) {
            console.log(
                ctx.helper.chalk.yellowBright(
                    `⚠️ [taro-plugin-tailwind]: platform ${CURRENT_PLATFORM} is not supported, auto skipping...`
                )
            );
            return;
        }
    });
    ctx.modifyWebpackChain(({ chain }) => {
        let configFilePath = `${HIDDEN_CONFIG_PATH}/${CURRENT_PLATFORM}.config.js`;
        if (!fs.existsSync(path.resolve(configFilePath))) {
            console.log(
                ctx.helper.chalk.yellowBright(
                    `⚠️ [taro-plugin-tailwind]: auto fallback to mini.config.js...`
                )
            );
            configFilePath = `${HIDDEN_CONFIG_PATH}/mini.config.js`; // fallback
        }
        // copy tailwind.config.js to root directory for tailwind intellisense support
        if (!fs.existsSync(path.resolve("tailwind.config.js"))) {
            fs.copySync(path.resolve(configFilePath), "tailwind.config.js");
            console.log(
                ctx.helper.chalk.greenBright(
                    `⚠️ [taro-plugin-tailwind]: copied ${configFilePath} as tailwind.config.js to root directory...`
                )
            );
        }
        chain.plugin("windicss-webpack-plugin").use(WebpackWindiCSSPlugin, [
            {
                scan: {
                    dirs: ["./src"],
                    fileExtensions: ["vue", "jsx", "tsx"],
                },
                config: configFilePath,
                ...config,
            },
        ]);
        if (SUPPORTED_MINI_PLATFORMS.includes(CURRENT_PLATFORM)) {
            chain.merge({
                module: {
                    rule: {
                        taroTailwindLoader: {
                            test: "windi.css",
                            use: [
                                {
                                    loader: "postcss-loader",
                                    options: {
                                        postcssOptions: {
                                            plugins: [
                                                [
                                                    "postcss-selector-replace",
                                                    {
                                                        before: ["*"],
                                                        after: [":root"],
                                                    },
                                                ],
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            });
        }
    });
};
