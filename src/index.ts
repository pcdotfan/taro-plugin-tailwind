import { IPluginContext } from '@tarojs/service';
import registerInitCommand from './init';
import modifyWebpackChain from './chain';

interface ITaroPluginTailwindOptions {
  test?: RegExp;
}

export default (ctx: IPluginContext, { test = /\/src\/tailwind\.src\.css$/ }: ITaroPluginTailwindOptions) => {
  registerInitCommand(ctx);
  modifyWebpackChain(ctx, test);
};
