# Next.js Code Config

A reusable configuration package for Next.js project.

## Main features

- Eslint config
- Prettier config

## Requirements

Eslint config:

- eslint 9.x

Prettier config:

- prettier 3.x

## Installation

- Create `.npmrc` file in your project. Include the following lines in the .npmrc file:

```bash
@erghi:registry=https://${CI_SERVER_HOST}/api/v4/projects/${CI_PROJECT_ID}/packages/npm/
//${CI_SERVER_HOST}/api/v4/projects/${CI_PROJECT_ID}/packages/npm/:_authToken=<your_auth_token>
```

- Replace `<your_auth_token>` with your access token, for example:

```txt
glpat-RvZFQjA-setvFW6ssBkb
```

- Install package

```bash
# Using npm
npm install @erghi/next-code-config

# Using yarn
yarn add @erghi/next-code-config

# Using pnpm
pnpm add @erghi/next-code-config
```

## Usage

### Eslint Config

#### Basic

```js
// eslint.config.mjs
import { createEslintConfig } from '@erghi/next-code-config';

const eslintConfig = createEslintConfig();

export default eslintConfig;
```

#### With callback function options

```js
// eslint.config.mjs
import { createEslintConfig } from '@erghi/next-code-config';

const eslintConfig = createEslintConfig(({ globals }) => ({
  customRules: { 'no-console': 'error' },
  extends: [
    {
      languageOptions: { globals: { ...globals.node, ...globals.jest } }
    }
  ]
}));

export default eslintConfig;
```

#### With static options

```js
// eslint.config.mjs
import { createEslintConfig } from '@erghi/next-code-config';

const eslintConfig = createEslintConfig({
  customRules: { 'no-alert': 'error' },
  extends: [{ rules: { 'no-debugger': 'warn' } }]
});

export default eslintConfig;
```

### Prettier Config

```js
// .prettierrc.mjs or prettier.config.mjs
import { createPrettierConfig } from '@erghi/next-code-config';

const customPrettierConfig = createPrettierConfig({
  singleQuote: false,
  tabWidth: 4
});

export default customPrettierConfig;
```

## Default Value

### Eslint Config

```js
[
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      import: importPlugin,
      next: nextPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'unused-imports': unusedImports
    }
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'next/no-img-element': 'off',
      'next/next-script-for-ga': 'error',
      'react/no-danger': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index'], ['object', 'unknown']],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before'
            },
            {
              pattern: 'next/**',
              group: 'builtin',
              position: 'before'
            },
            {
              pattern: 'lodash',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'redux',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'react-redux',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@reduxjs/**',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'react-hook-form',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@hookform/**',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'yup',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'i18next',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'react-i18next',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@mui/material',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@mui/material/**',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@mui/system',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@mui/icons-material/**',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@dront/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '~/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '*.css',
              patternOptions: { matchBase: true },
              group: 'internal',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      'newline-before-return': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-vars': 'off',
      'no-use-before-define': [
        'error',
        {
          functions: true,
          classes: true,
          variables: true,
          allowNamedExports: false
        }
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: ['export'], next: ['*'] },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var']
        }
      ],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
];
```

### Prettier Config

```js
{
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 120,
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none'
}
```
