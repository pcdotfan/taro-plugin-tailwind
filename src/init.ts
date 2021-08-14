import { IPluginContext } from "@tarojs/service";
import { HIDDEN_CONFIG_PATH } from "./constant";

const fs = require("fs-extra");
const path = require("path");

export default (ctx: IPluginContext) => {
    ctx.registerCommand({
        name: "tailwind",
        optionsMap: {
            "--init": "generates necessary configs",
        },
        synopsisList: [
            "taro tailwind --init",
            "taro tailwind --init weapp,dd,tt,swan",
        ],
        fn() {
            const {
                options: { init },
            } = ctx.runOpts;
            const defaultConfig = path.join(
                __dirname,
                `../config/mini.config.js`
            );
            let generatePlatforms = ["mini", "h5"];
            if (init && typeof init === "string" && init.trim()) {
                generatePlatforms = init.split(",");
            }
            generatePlatforms.forEach((platform) => {
                const filePath = `${HIDDEN_CONFIG_PATH}/${platform}.config.js`;
                const targetFile = path.resolve(filePath);
                if (fs.existsSync(targetFile)) {
                    console.log(
                        ctx.helper.chalk.redBright(
                            `⚠️ [taro-plugin-tailwind] File ${filePath} exists!`
                        )
                    );
                    return;
                }
                if (
                    fs.existsSync(
                        path.join(__dirname, `../config/${platform}.config.js`)
                    )
                ) {
                    fs.copySync(
                        path.join(__dirname, `../config/${platform}.config.js`),
                        targetFile
                    );
                } else {
                    fs.copySync(defaultConfig, targetFile);
                }
                console.log(
                    ctx.helper.chalk.greenBright(
                        `[taro-plugin-tailwind] File ${filePath} has been created.`
                    )
                );
            });
        },
    });
};
