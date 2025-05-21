// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/public/**',
      'app/generated/prisma/**',
    ],
  },
  ...compat.extends('next/core-web-vitals'),
];
