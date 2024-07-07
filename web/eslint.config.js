import globals from "globals";
import tseslint from "typescript-eslint";

import solid from 'eslint-plugin-solid/configs/typescript';


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  ...tseslint.configs.recommended,
  ...solid
];