module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    extraFileExtensions: ['.svelte']
  },
  plugins: [
    'svelte3',
    '@typescript-eslint'
  ],
  settings: {
    'svelte3/typescript': require('typescript'),
    'svelte3/ignore-styles': () => true
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  ignorePatterns: [
    'node_modules',
    '.eslintrc.js',
    'vite.config.js',
    'svelte.config.cjs'
  ],
  rules: {
    'no-console': 1,
    'no-unused-vars': 1,
    'eqeqeq': 2,
    'semi': [2, 'never'],
    'no-useless-catch': 1
  }
}