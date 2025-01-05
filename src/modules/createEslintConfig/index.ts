import pluginJs from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';

interface CreateEslintConfigOptions {
  /**
   * Custom rules to extend or override the default ESLint rules.
   * These rules are applied in the generated ESLint configuration.
   *
   * @example
   * {
   *   'no-console': 'error'
   * }
   */
  customRules?: Linter.RulesRecord;
  /**
   * An array of configurations to extend. These configurations
   * can include additional rules, plugins, or settings.
   *
   * @example
   * [
   *   {
   *     rules: { 'no-debugger': 'warn' }
   *   },
   *   {
   *     plugins: { prettier: prettierPlugin }
   *   }
   * ]
   */
  extends?: Linter.Config[];
}

interface CreateEslintConfigOptionsParams {
  globals?: typeof globals;
}

type CreateEslintConfigFunctionOptions = (config: CreateEslintConfigOptionsParams) => CreateEslintConfigOptions;

type CreateEslintOptions = CreateEslintConfigFunctionOptions | CreateEslintConfigOptions;

/**
 * Creates a custom ESLint configuration by merging default settings with custom rules and extensions.
 *
 * @param {CreateEslintOptions} [options] - Either an object containing custom rules and extensions
 * or a callback function that generates them based on available globals.
 * @returns {Linter.Config[]} - An array of ESLint configuration objects.
 *
 * @example
 * // eslint.config.mjs
 * import { createEslintConfig } from '@erghi/next-code-config';
 *
 * const eslintConfig = createEslintConfig();
 *
 * export default eslintConfig;
 *
 * // Example usage with Callback function options
 * import { createEslintConfig } from '@erghi/next-code-config';
 *
 * const eslintConfig = createEslintConfig(({ globals }) => ({
 *   customRules: { 'no-console': 'error' },
 *   extends: [
 *     {
 *       languageOptions: { globals: { ...globals.node, ...globals.jest } },
 *     }
 *   ]
 * }));
 *
 * export default eslintConfig;
 *
 * // Example usage with static options
 * import { createEslintConfig } from '@erghi/next-code-config';
 *
 * const eslintConfig = createEslintConfig({
 *   customRules: { 'no-alert': 'error' },
 *   extends: [{ rules: { 'no-debugger': 'warn' } }]
 * });
 *
 * export default eslintConfig;
 */
export default function createEslintConfig(options?: CreateEslintOptions): Linter.Config[] {
  const newOptions = typeof options === 'function' ? options({ globals }) : options;

  return [
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
    ...(tseslint.configs.recommended as unknown as Linter.Config[]),
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
        ],
        ...newOptions?.customRules
      }
    },
    ...(newOptions?.extends ?? [])
  ];
}
