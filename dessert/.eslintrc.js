module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
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
    '*.config.js'
  ],
  rules: {
    'no-console': 1,
    'class-methods-use-this': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-param-reassign': 2,
    'semi': [
      2,
      'never'
    ],
    'eqeqeq': 2,
    'no-useless-catch': 1,
    '@typescript-eslint/no-unused-vars': 1,
    'no-plusplus': 0,
    'array-element-newline': 2,
    'array-bracket-newline': [
      2,
      {
        'multiline': true
      }
    ],
    'array-bracket-spacing': 2,
    'object-property-newline': [
      2,
      {
        'allowMultiplePropertiesPerLine': false
      }
    ],
    'object-curly-newline': [
      2,
      {
        'ObjectExpression': {
          'multiline': true,
          'minProperties': 1
        },
        'ObjectPattern': {
          'multiline': true,
          'minProperties': 3
        },
        'ImportDeclaration': {
          'minProperties': 2
        },
        'ExportDeclaration': {
          'minProperties': 1
        }
      }
    ],
    'max-classes-per-file': 0,
    'object-curly-spacing': [2, 'always'],
    'object-shorthand': 2,
    'comma-dangle': [
      2,
      'never'
    ],
    'indent': [
      2,
      2
    ],
    'newline-per-chained-call': [
      2,
      {
        'ignoreChainWithDepth': 1
      }
    ],
    'key-spacing': [
      2,
      {
        'align': 'colon'
      }
    ],
    'func-names': 0,
    'import/extensions': [
      0,
      {
        'ts': 'always'
      }
    ],
    'import/no-extraneous-dependencies': 0,
    'quotes': [2, 'single'],
    'max-len': ['error', { 'code': 80 }],
    'no-trailing-spaces': 2,
    'curly': [2, 'multi']
  }
}