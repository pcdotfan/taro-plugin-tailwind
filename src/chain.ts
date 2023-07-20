import { IPluginContext, ITaroPluginTailwindOptions } from "index";
import {
  HIDDEN_CONFIG_PATH,
  CURRENT_PLATFORM,
  SUPPORTED_PLATFORMS,
  SUPPORTED_MINI_PLATFORMS,
} from "./constant";
import { existsSync, copySync } from "fs-extra";
import * as path from "path";

const getConfigPath = (platform) =>
  `${HIDDEN_CONFIG_PATH}/${platform}.config.js`;
const checkConfigExists = (platform) =>
  existsSync(path.resolve(getConfigPath(platform)));

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
    if (!existsSync(path.resolve(configFilePath))) {
      console.log(
        ctx.helper.chalk.yellowBright(
          `⚠️ [taro-plugin-tailwind]: auto fallback to mini.config.js...`
        )
      );
      configFilePath = `${HIDDEN_CONFIG_PATH}/mini.config.js`; // fallback
    }
    // copy tailwind.config.js to root directory for tailwind intellisense support
    if (!existsSync(path.resolve("tailwind.config.js"))) {
      copySync(path.resolve(configFilePath), "tailwind.config.js");
      console.log(
        ctx.helper.chalk.greenBright(
          `⚠️ [taro-plugin-tailwind]: copied ${configFilePath} as tailwind.config.js to root directory...`
        )
      );
    }
    if (SUPPORTED_MINI_PLATFORMS.includes(CURRENT_PLATFORM)) {
      chain.merge({
        module: {
          rule: {
            taroTailwindLoader: {
              test: /\.css$/i,
              use: [
                {
                  loader: "postcss-loader",
                  options: {
                    postcssOptions: {
                      plugins: [
                        [
                          "tailwindcss",
                          {
                            config: path.resolve("tailwind.config.js"),
                            ...config,
                          },
                        ],
                        ["autoprefixer"],
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
