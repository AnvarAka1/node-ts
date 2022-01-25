module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    "import"
  ],
  rules: {
    "import/newline-after-import": ["error"],
    "import/no-unresolved": "off",
    "import/named": "off",
    'import/no-named-as-default-member': 'off',
    "import/no-extraneous-dependencies": ["error"],
    "key-spacing": "off",
    "no-use-before-define": "off",
    "max-len": ['error', 120, 2],
    "object-curly-spacing": ['error', "always"],
    "indent": ['error', 2, { "SwitchCase": 1 }],
    "comma-dangle": "off",
    'quotes': 'off',
    'semi': 'off',
    'no-console': 'error',
    'no-empty': 'off',
    'no-empty-function': 'off',
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "sibling", "parent"],
        "newlines-between": "always",
        "pathGroups": [
          {
            "pattern": "~/**",
            "group": "internal"
          }
        ]
      }
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    "@typescript-eslint/semi": ['error', 'never'],
    '@typescript-eslint/space-infix-ops': 'error',
    "@typescript-eslint/no-use-before-define": ["error"],
    '@typescript-eslint/space-before-function-paren': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:@typescript-eslint/recommended',
    "plugin:import/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true
      }
    }
  }
}
