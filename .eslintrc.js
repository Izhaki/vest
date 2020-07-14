// These are allowed to require packages from devDependecies
const devScripts = ['**/next.config.js'];

module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-hooks', '@typescript-eslint'],
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:import/recommended',
    'plugin:import/typescript', // Allow js file import ts files.
  ],
  settings: {
    react: {
      version: 'detect',
    },
    // https://www.npmjs.com/package/eslint-import-resolver-typescript
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {},
    },
  },
  rules: {
    // urm... the whole immer is based on param-reassign.
    'no-param-reassign': 'off',
    // airbnb errors on for..of and for...in but we want these.
    'no-restricted-syntax': ['warn', 'WithStatement', 'LabeledStatement'],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.ts'] }],
    // Allow dev scripts (like next.config.js) to import from dev dependencies.
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: devScripts },
    ],
    // https://github.com/benmosher/eslint-plugin-import/issues/1615#issuecomment-577500405
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
