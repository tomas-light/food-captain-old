import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { merge } from 'webpack-merge';

import { cssRule, tsRule } from './rules';

const rootPath = path.join(__dirname, '..');
const staticPath = path.join(rootPath, 'static');
const paths = {
  dist: path.join(rootPath, '..', 'dist'),
  htmlTemplate: path.join(staticPath, 'index.html'),
  outputFilename: path.join(staticPath, 'index.html'),
  favicon: path.join(staticPath, 'img', 'favicon.svg'),
  env: path.join(rootPath, '.env'),
  config: path.join(rootPath, 'src', 'config', 'environment', 'index.ts'),
};

function setEnvVariables(envPath) {
  const variables = dotenv.config({ path: envPath }).parsed;

  fs.writeFileSync(paths.config, '');
  Object.keys(variables).forEach(variableName => {
    fs.appendFileSync(paths.config, `export const ${variableName} = '${variables[variableName]}';`);
  })
}

setEnvVariables(paths.env);

const commonConfig = merge(
  {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
      publicPath: '/',
      path: paths.dist,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.htmlTemplate,
        favicon: paths.favicon,
      }),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(staticPath, 'css'),
            to: paths.dist,
          },
        ],
      }),
    ],
  },
  cssRule(),
  tsRule(),
);

module.exports = commonConfig;
