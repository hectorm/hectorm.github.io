import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";

export default [
  ...eslintPluginVue.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: globals.browser,
    },
    ignores: ["node_modules/**", "dist/**"],
  },
];
