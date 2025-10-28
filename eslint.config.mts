import globals from 'globals';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import yml from 'eslint-plugin-yml';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  {
    files: ['**/__test__/**/*.ts', '**/*.test.ts', '**/*.spec.ts'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
    },
  },
  {
    files: ['**/*.json'],
    ignores: ['package-lock.json'],
    plugins: { json, prettier: prettierPlugin },
    language: 'json/json',
  },
  {
    files: ['**/*.md'],
    plugins: { markdown, prettier: prettierPlugin },
    language: 'markdown/commonmark',
  },
  ...yml.configs['flat/recommended'],
  ...yml.configs['flat/prettier'],
  {
    files: ['**/*.{yml,yaml}'],
    plugins: {
      yml,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'yml/no-empty-mapping-value': 'off',
    },
  },
];
