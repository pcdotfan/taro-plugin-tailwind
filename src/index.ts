import { IPluginContext } from '@tarojs/service';
import registerInitCommand from './init';
import modifyWebpackChain from './chain';
import { ITaroPluginTailwindOptions } from 'index';

export default (ctx: IPluginContext, config: ITaroPluginTailwindOptions) => {
    registerInitCommand(ctx);
    modifyWebpackChain(ctx, config);
};
