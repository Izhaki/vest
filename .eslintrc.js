const defaultExtends = [
  'plugin:import/recommended',
  'airbnb',
  'prettier',
  'prettier/react',
];

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
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-hooks'],
  extends: defaultExtends,
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {},
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: devScripts },
    ],
  },
  overrides: [
    {
      // Typescript
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [...defaultExtends, 'prettier/@typescript-eslint'],
      rules: {
        'react/jsx-filename-extension': [
          'error',
          {
            extensions: ['.jsx', '.tsx'],
          },
        ],
      },
    },
  ],
};
