import type { Config } from 'prettier';

/**
 * Creates a Prettier configuration by merging default settings with custom options.
 *
 * @param {Config} options - Custom Prettier options to override the default configuration.
 * @returns {Config} - The final Prettier configuration object.
 *
 * @example
 * // .prettierrc.mjs or prettier.config.mjs
 * import { createPrettierConfig } from '@erghi/next-code-config';
 *
 * const customPrettierConfig = createPrettierConfig({
 *   singleQuote: false,
 *   tabWidth: 4
 * });
 *
 * export default customPrettierConfig;
 */
export default function createPrettierConfig(options: Config): Config {
  return {
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
    trailingComma: 'none',
    ...options
  };
}
