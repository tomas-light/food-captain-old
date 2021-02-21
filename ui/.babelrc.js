const presets = [
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-typescript'
];

const alias = {
  '@api': './src/api',
  '@app': './src/app',
  '@config': './src/config',
  '@env': './src/config/environment',
  '@Notifier': './src/app/Notifier',
  '@shared': './src/shared',
  '@State': './src/config/redux/State',
  '@utils': './src/utils',
};

const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  [
    'babel-plugin-module-resolver',
    {
      root: ['./src/'],
      alias,
    },
  ],
  [
    '@babel/plugin-transform-runtime',
    {
      regenerator: true,
    },
  ],
];

const babelConfig = {
  presets,
  plugins,
};

module.exports = babelConfig;
