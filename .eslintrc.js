module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "google", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {},
  settings: {
    react: {
      version: "latest",
    },
  },
  rules: {
    "new-cap": 0,
    "comma-dangle": 0,
    "react/jsx-uses-vars": 1,
    "no-unused-vars": "off",
    "react/display-name": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "no-console": 1,
    "no-unexpected-multiline": "warn",
    indent: "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-empty-function": [
      "error",
      { allow: ["arrowFunctions"] },
    ],
    "@typescript-eslint/no-empty-interface": "off",
    "react/prop-types": "off",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          { group: [".*"], message: "Relative import paths are not allowed." },
        ],
      },
    ],
  },
};
