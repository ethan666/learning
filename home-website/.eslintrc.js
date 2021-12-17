const path = require("path");

module.exports = {
  root: true,
  env: {
    node: true,
  },
  // parser: "@babel/eslint-parser",
  // parserOptions: {
  //   sourceType: "module",
  //   babelOptions: {
  //     configFile: path.join(__dirname, "babel.config.js"),
  //   },
  // },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    sourceType: "module",
    babelOptions: {
      configFile: path.join(__dirname, "babel.config.js"),
    },
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
