// module.exports = {
//   root: true,
//   extends: '@react-native',
// };
module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@babel/eslint-parser',
  parseroptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['module:metro-react-native-babel-preset'],
    },
    rules: {},
  },
};
