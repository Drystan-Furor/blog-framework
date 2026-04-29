const nodeGlobals = {
  console: "readonly",
  process: "readonly",
  URL: "readonly",
  URLSearchParams: "readonly"
};

export default [
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**"]
  },
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: nodeGlobals
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-undef": "error"
    }
  }
];
