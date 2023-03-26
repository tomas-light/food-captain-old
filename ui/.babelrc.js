const presets = [
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-typescript'
];

const alias = {
  '~api': './src/api',
  '~app': './src/app',
  '~config': './src/config',
  '~env': './src/config/environment',
  '~models': './src/app/models',
  '~Notifier': './src/app/Notifier',
  '~select': './src/shared/organisms/fields/Select',
  '~selectors': './src/selectors',
  '~shared': './src/shared',
  '~State': './src/config/redux/State',
  '~utils': './src/utils',
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
  'const-enum'
];

const babelConfig = {
  presets,
  plugins,
};

module.exports = babelConfig;
