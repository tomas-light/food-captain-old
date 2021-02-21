module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    curly: [1, 'all'],
    'brace-style': [1, 'stroustrup'],
    'object-curly-newline': [1, {
      ObjectExpression: {
        multiline: true,
        minProperties: 3,
        consistent: true,
      },
      ObjectPattern: {
        multiline: true,
        minProperties: 3,
        consistent: true,
      },
      ImportDeclaration: {
        multiline: true,
        minProperties: 3,
        consistent: true,
      },
      ExportDeclaration: {
        multiline: true,
        minProperties: 3,
        consistent: true,
      },
    }],
    'no-trailing-spaces': [1, {
      skipBlankLines: true,
      ignoreComments: true,
    }],
    'linebreak-style': 'off',
    'arrow-parens': [1, 'as-needed'],
    quotes: [1, 'single'],
    semi: [2, 'always'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
