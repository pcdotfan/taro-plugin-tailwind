#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import colors from 'colors';
import minimist from 'minimist';
import { HIDDEN_CONFIG_PATH } from './constant';

const args = minimist<{ output: string }>(process.argv.slice(2));

let generatePlatforms: string[] = ['mini', 'h5'];

if (args.platform && typeof args.platform === 'string') {
    generatePlatforms = args.generatePlatform.split(',');
}

generatePlatforms.map(platform => {
    const targetFile = path.resolve(`${HIDDEN_CONFIG_PATH}/${platform}.config.js`);

    if (fs.existsSync(targetFile)) {
        console.error(
            colors.red(
                `⚠️ [taro-plugin-tailwind] File ${HIDDEN_CONFIG_PATH}/${platform}.config.js was created before.`
            )
        );
    } else {
        fse.copySync(path.join(__dirname, `../config/${platform}.config.js`), targetFile);
        console.log(
            colors.green(
                `[taro-plugin-tailwind] File ${HIDDEN_CONFIG_PATH}/${platform}.config.js is created now.`
            )
        );
    }
});
