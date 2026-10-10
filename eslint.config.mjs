import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

// Next 16 exports native flat configs; wrapping them in FlatCompat creates cycles.
export default [
  { ignores: ['.next/**', '.contentlayer/**', 'out/**', '.yarn/**', 'node_modules/**', 'next-env.d.ts'] },
  ...nextVitals,
  ...nextTypescript,
  prettier,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    rules: {
      // Preserve the existing project's TS and rendering conventions.
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
];
