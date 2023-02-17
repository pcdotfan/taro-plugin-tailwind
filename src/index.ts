import registerInitCommand from "./init";
import modifyWebpackChain from "./chain";
import { IPluginContext, ITaroPluginTailwindOptions } from "index";

export default (ctx: IPluginContext, config: ITaroPluginTailwindOptions) => {
  registerInitCommand(ctx);
  modifyWebpackChain(ctx, config);
};
