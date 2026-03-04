// eslint.config.js
export default [
  // 基本配置
  {
    files: ["**/*.{js,ts}"],
    ignores: ["**/dist/**", "**/node_modules/**", "**/.temp/**", "**/.cache/**"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        node: true,
        browser: true,
        window: true,
        document: true,
        navigator: true,
        self: true,
        fetch: true,
        caches: true,
        Request: true,
        Response: true,
        Headers: true,
        URL: true,
        location: true,
        setTimeout: true,
        clearTimeout: true,
        requestAnimationFrame: true,
        cancelAnimationFrame: true,
        importScripts: true,
        registration: true,
        FetchEvent: true
      }
    },
    rules: {
      // ESLint 推荐规则
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];