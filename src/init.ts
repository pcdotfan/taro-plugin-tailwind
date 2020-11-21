#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import { HIDDEN_CONFIG_PATH } from './constant';
import { IPluginContext } from '@tarojs/service';

export default (ctx: IPluginContext) => {
    ctx.registerCommand({
        name: 'tailwind',
        optionsMap: {
            '--init': '生成必要的配置文件和 tailwind.src.css 文件',
        },
        synopsisList: ['taro tailwind --init', 'taro tailwind --init weapp,dd,tt,swan'],
        async fn() {
            const { init } = ctx.runOpts;
            let generatePlatforms: string[] = ['mini', 'h5'];

            if (init && typeof init === 'string' && init.trim()) {
                generatePlatforms = init.split(',');
            }

            generatePlatforms.map(platform => {
                const targetFile = path.resolve(`${HIDDEN_CONFIG_PATH}/${platform}.config.js`);
                if (fs.existsSync(targetFile)) {
                    ctx.helper.chalk.redBright(
                        `⚠️ [taro-plugin-tailwind] File ${HIDDEN_CONFIG_PATH}/${platform}.config.js exists!`
                    );
                } else {
                    fse.copySync(
                        path.join(__dirname, `../config/${platform}.config.js`),
                        targetFile
                    );
                    ctx.helper.chalk.greenBright(
                        `[taro-plugin-tailwind] File ${HIDDEN_CONFIG_PATH}/${platform}.config.js has been created.`
                    );
                }
            });
        },
    });
};
