const path = require("path");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const buble = require("rollup-plugin-buble");
const vue = require("rollup-plugin-vue");
const json = require("rollup-plugin-json");
const alias = require("rollup-plugin-alias");
const { terser } = require("rollup-plugin-terser");
const scss = require("rollup-plugin-scss");
const CleanCSS = require("clean-css");
const image = require("@rollup/plugin-image");

const { isProduction } = require("./utlils");
const { writeFileSync, existsSync, mkdirSync } = require("fs");
const projectRootDir = path.resolve(__dirname);

const inputOptions = {
  input: "src/main.js",
  plugins: [
    alias({
      "@": [
        {
          find: "src",
          replacement: path.resolve(projectRootDir, "src"),
        },
      ],
    }),
    json({
      compact: true,
    }),
    vue({
      css: false
    }),
    image({
      exclude: ["node_modules/**"],
      include: ["src/**"],
    }),
    scss({
      output(style) {
        if (!existsSync("dist")) {
          mkdirSync("dist");
        }
        writeFileSync("dist/library.min.css", new CleanCSS().minify(style).styles);
      },
    }),
    resolve(),
    buble({
      exclude: ["node_modules/**"],
    }),
    commonjs(),
    isProduction && terser(),
  ],
};

const output = {
  file: "dist/library.es.js",
  name: "library",
  format: "es"
};
const exportModule = {
  ...inputOptions,
  output,
};
isProduction() &&
  (exportModule["watch"] = {
    include: "src/**",
  });
  
module.exports = exportModule;
