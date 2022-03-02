export const HIDDEN_CONFIG_PATH = ".taro-plugin-tailwind";
export const SUPPORTED_MINI_PLATFORMS = [
    "weapp",
    "qywx",
    "swan",
    "alipay",
    "dd",
    "iot",
    "xhs",
    "lark",
    "kwai",
    "tt",
    "qq",
    "quickapp",
    "h5",
];
export const SUPPORTED_PLATFORMS = ["h5", ...SUPPORTED_MINI_PLATFORMS];
export const CURRENT_PLATFORM = process.env.TARO_ENV || "UNSUPPORTED";
