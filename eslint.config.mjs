// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import next from "eslint-plugin-next";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      "app/generated/prisma/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    plugins: { next },
    rules: next.configs["core-web-vitals"].rules,
  },
];
