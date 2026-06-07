import type { Linter } from "eslint";
import { defineConfig, Config } from "eslint/config";
import type { ConfigWithExtendsArray } from "@eslint/config-helpers";
import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";

const noUnusedVarsOptions: Linter.RuleEntry = [
  "error",
  {
    argsIgnorePattern: "^_",
    varsIgnorePattern: "^_",
    caughtErrorsIgnorePattern: "^_",
    destructuredArrayIgnorePattern: "^_",
  },
];

export const flatConfig: ConfigWithExtendsArray = [
  {
    ignores: ["coverage/**", "dist/**"],
  },
  eslint.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    extends: [tsEslint.configs.disableTypeChecked],
    languageOptions: {
      ecmaVersion: "latest",
    },
    rules: {
      "no-unused-vars": noUnusedVarsOptions,
    },
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": noUnusedVarsOptions,
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowAny: false,
          allowArray: false,
          allowBoolean: true,
          allowNever: false,
          allowNullish: true,
          allowNumber: true,
          allowRegExp: false,
        },
      ],
    },
  },
];

export const eslintConfig: Config[] = defineConfig(...flatConfig);
