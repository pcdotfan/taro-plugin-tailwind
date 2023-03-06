const range = (size) =>
    Object.fromEntries(
        [...Array(size).keys()]
            .slice(1)
            .map((i) => [`${i}_${size}`, `${(i / size) * 100}%`])
    );

module.exports = {
  content: ["./src/**/*.{js,tx,tsx,jsx,vue}"],
  prefixer: false,
  separator: "_",
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
    transitionProperty: false,
  },
  exclude: [/([0-9]{1,}[.][0-9]*)$/],
  theme: {
    width: (theme) => ({
      auto: "auto",
      full: "100%",
      screen: "100vw",
      ...Object.assign(...[2, 3, 4, 5, 6, 12].map(range)),
      ...theme("spacing"),
    }),
    height: (theme) => ({
      auto: "auto",
      full: "100%",
      screen: "100vh",
      ...Object.assign(...[2, 3, 4, 5, 6, 12].map(range)),
      ...theme("spacing"),
    }),
    maxHeight: {
      full: "100%",
      screen: "100vh",
    },
  },
};
