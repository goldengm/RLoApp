module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      root: [
        "./src"
      ],
      alias: {
        "images": "./src/assets/images",
        "fonts": "./src/assets/fonts",
        "mapIcons": "./src/assets/mapIcons"
      }
    }]
  ]
};
