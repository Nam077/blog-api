module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "prettier",
    "simple-import-sort",
    "unused-imports",
    "prefer-arrow",
    "import",
    "security" // Thêm plugin security vào đây
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:security/recommended-legacy" // Thêm cấu hình security vào đây
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        "disallowPrototype": true,
        "singleReturnOnly": false,
        "classPropertiesAllowed": false
      }
    ],
    "prefer-arrow-callback": [
      "error",
      { "allowNamedFunctions": true }
    ],
    "func-style": [
      "error",
      "expression",
      { "allowArrowFunctions": true }
    ],
    "no-unused-vars": "off", // hoặc "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_",
      },
    ],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prettier/prettier": [
      "error",
      {
        arrowParens: "always",
        bracketSameLine: false,
        bracketSpacing: true,
        embeddedLanguageFormatting: "auto",
        htmlWhitespaceSensitivity: "css",
        insertPragma: false,
        jsxSingleQuote: false,
        printWidth: 120,
        proseWrap: "preserve",
        quoteProps: "as-needed",
        requirePragma: false,
        semi: true,
        singleQuote: true,
        tabWidth: 4,
        trailingComma: "all",
        useTabs: false,
        vueIndentScriptAndStyle: false,
        parser: "typescript",
        endOfLine: "auto",
      },
    ],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'any',
        prev: 'export',
        next: 'export'
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*'
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['function', 'multiline-const', 'multiline-block-like']
      },
      {
        blankLine: 'always',
        prev: ['function', 'multiline-const', 'multiline-block-like'],
        next: '*'
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'function'
      },
      {
        blankLine: 'always',
        prev: 'function',
        next: '*'
      }
    ],
    'import/newline-after-import': ['error', { 'count': 1 }],
    'newline-before-return': 'error',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    //   '@typescript-eslint/explicit-member-accessibility': [
    //     'error',
    //     {
    //       accessibility: 'explicit',
    //       overrides: {
    //         constructors: 'no-public',
    //       },
    //     },
    //   ],
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true }
    ],
    // Quy tắc của plugin security
    //   'security/detect-object-injection': 'off', // Tắt quy tắc nếu bạn gặp nhiều false positives
  },
  settings: {
    'import/resolver': {
      typescript: {
        "alwaysTryTypes": true, // Tùy chọn này để ESLint tìm trong các thư viện node_modules
        "project": "./tsconfig.json" // Đảm bảo chỉ ra đúng đường dẫn đến file tsconfig.json
      }, // This loads alias config from tsconfig.json
    },
  },
};
