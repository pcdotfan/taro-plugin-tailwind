module.exports = {
  content: ["./src/**/*.{js,tx,tsx,jsx,vue}"],
  prefixer: false,
  compile: false,
  globalUtility: false,
  darkMode: "media",
  corePlugins: {
    preflight: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false,
    space: false,
    placeholderColor: false,
    placeholderOpacity: false,
  },
};
