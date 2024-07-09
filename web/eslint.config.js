import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

import solid from "eslint-plugin-solid/dist/index.js";

import prettier from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "eslint.config.mjs"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["*.ts,tsx"],
    ...solid,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "tsconfig.json",
      },
      globals: globals.node,
    },
  },
  prettier,
);
