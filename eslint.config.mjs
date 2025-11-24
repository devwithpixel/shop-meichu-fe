import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends:
      ("next",
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended"),
    parser: "@typescript-eslint/parser",
    rules: {
      semi: ["error"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "@typescript-eslint/no-explicit-any": "off",
    },
  }),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
