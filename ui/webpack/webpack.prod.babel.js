import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';

import common from './webpack.common';

const prodConfig = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].bundle.[contenthash].js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [new TerserPlugin()],
  },
});

module.exports = prodConfig;
