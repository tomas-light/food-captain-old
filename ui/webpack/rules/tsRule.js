export function tsRule() {
  return {
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            'ts-loader',
          ],
        },
      ],
    },
  };
}
