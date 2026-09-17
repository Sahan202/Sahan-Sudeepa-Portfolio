import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

const config = [
  ...nextVitals,
  ...nextTypescript,
  prettierConfig,
  { ignores: ['.next/**', 'out/**', 'dist/**', '.yarn/**', 'next-env.d.ts'] },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { prettier, 'unused-imports': unusedImports },
    rules: {
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
  },
];

export default config;
