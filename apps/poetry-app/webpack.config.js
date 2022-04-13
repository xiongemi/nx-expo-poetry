const path = require('path');

const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  const rules = config.module.rules[1]?.oneOf;
  if (rules) {
    rules.push({
      test: /\.(mjs|[jt]sx?)$/,
      exclude: /node_modules[/\\](?!react-native-vector-icons)/,
      use: {
        loader: require.resolve('@nrwl/web/src/utils/web-babel-loader.js'),
        options: {
          presets: [
            [
              '@nrwl/react/babel',
              {
                runtime: 'automatic',
              },
            ],
          ],
        },
      },
    });
  }

  const extensions = ['.ts', '.tsx', '.mjs', '.js', '.jsx'];
  let tsConfigPath = 'tsconfig.json';

  config.resolve.plugins.push(
    new TsconfigPathsPlugin({
      configFile: tsConfigPath,
      extensions,
    })
  );

  config.resolve.alias = {
    ...config.resolve.alias,
    react: path.resolve('../../node_modules/react'),
    'react-dom': path.resolve('../../node_modules/react-dom'),
    'react-native-reanimated': path.resolve(
      '../../node_modules/react-native-reanimated'
    ),
    '@react-navigation/native': path.resolve(
      '../../node_modules/@react-navigation/native'
    ),
  };
  return config;
};
