import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import * as parserVue from "vue-eslint-parser";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import { defineFlatConfig } from "eslint-define-config";
import * as parserTypeScript from "@typescript-eslint/parser";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default defineFlatConfig([
  {
    ...js.configs.recommended,
    ignores: ["**/.*", "dist/**/*", "*.d.ts", "public/*", "src/assets/**"],
    languageOptions: {
      globals: globals.browser
    },
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      "no-debugger": "off",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto"
        }
      ]
    }
  },
  {
    files: ["**/*.?([cm])ts", "**/*.?([cm])tsx"],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript
    },
    rules: {
      ...pluginTypeScript.configs.strict.rules,
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/prefer-as-const": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          disallowTypeAnnotations: false,
          fixStyle: "inline-type-imports"
        }
      ],
      "@typescript-eslint/prefer-literal-enum-member": [
        "error",
        {
          allowBitwiseExpressions: true
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ]
    }
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "eslint-comments/no-unlimited-disable": "off",
      "import/no-duplicates": "off",
      "unused-imports/no-unused-vars": "off"
    }
  },
  {
    files: ["**/*.?([cm])js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off"
    }
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      globals: {
        $: "readonly",
        $$: "readonly",
        $computed: "readonly",
        $customRef: "readonly",
        $ref: "readonly",
        $shallowRef: "readonly",
        $toRef: "readonly"
      },
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: [".vue"],
        parser: "@typescript-eslint/parser",
        sourceType: "module"
      }
    },
    plugins: {
      vue: pluginVue
    },
    processor: pluginVue.processors[".vue"],
    rules: {
      // 基本规则
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "prettier/prettier": ["warn", {}, { usePrettierrc: true, indent: 2 }],

      // TypeScript 相关规则
      "@typescript-eslint/no-non-null-assertion": 0, // 允许使用非空断言
      "@typescript-eslint/no-explicit-any": 0, // 允许显式的 any，但禁止隐式 any
      "ts/prefer-literal-enum-member": "off", // 允许字面量枚举成员

      // Vue 相关规则
      "vue/multi-word-component-names": 0, // 允许单词组件名称
      "vue/no-lone-template": 0, // 允许单一模板
      "vue/v-on-event-hyphenation": [
        "warn",
        "always",
        { ignore: ["leftOverlayClick", "update:modelValue"] }
      ], // 使用 kebab-case 的 v-on 事件
      "vue/custom-event-name-casing": ["error", "kebab-case"], // 自定义事件使用 kebab-case
      "vue/component-name-in-template-casing": [
        "warn",
        "PascalCase",
        { registeredComponentsOnly: false }
      ], // 组件名称使用 PascalCase
      "vue/script-indent": "off", // 使用 2 个空格缩进
      "vue/singleline-html-element-content-newline": "off", // 允许单行 HTML 元素内容
      // 'vue/max-attributes-per-line': ['error', { singleline: { max: 1 }, multiline: { max: 1 } }], // 强制属性每行一个

      // 其他规则
      "no-async-promise-executor": "off", // 允许异步 Promise 执行器
      "no-cond-assign": "off", // 允许条件赋值
      "array-callback-return": "off", // 允许数组回调返回
      "antfu/if-newline": "off", // 允许 if 语句换行
      curly: ["error", "all"], // 强制所有块语句使用大括号
      "no-unused-vars": "off" // 关闭未使用变量检测
    }
  }
]);
