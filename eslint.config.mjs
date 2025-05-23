import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import pluginJest from 'eslint-plugin-jest';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Ignores
  { ignores: ['dist'] },

  // Base config
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022, // Should match the "target" version in "tsconfig.json"
      globals: globals.node,
    },
    extends: [
      // "eslint", "typescript-eslint": Must start with eslint and be placed first
      eslint.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic,

      eslintConfigPrettier, // "eslint-config-prettier": Must be placed last
    ],
    plugins: {
      'check-file': checkFile, // "eslint-plugin-check-file"
    },
    rules: {
      // "eslint": Prevent imports
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['../**', 'src/*'], message: "Use '@/' instead" },
          ],
        },
      ],

      // "eslint-plugin-check-file": Force naming conventions
      'check-file/folder-naming-convention': [
        'error',
        { 'src/**/!(__tests__)': 'KEBAB_CASE' },
      ],
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
    },
  },

  // Jest config
  {
    files: ['**/*.{spec,test}.{ts,tsx}'],
    languageOptions: {
      globals: pluginJest.environments.globals.globals, // Global variables available to Jest
    },
    extends: [
      pluginJest.configs['flat/recommended'], // "eslint-plugin-jest"
    ],
  },
);
