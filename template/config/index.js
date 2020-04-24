const path = require("path");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const buble = require("rollup-plugin-buble");
{{#vue}}
const vue = require("rollup-plugin-vue");
{{/vue}}
{{#json}}
const json = require("rollup-plugin-json");
{{/json}}
const alias = require("rollup-plugin-alias");
{{#/terser}}
const { terser } = require("rollup-plugin-terser");
{{/terser}}
{{}}
const scss = require("rollup-plugin-scss");
const CleanCSS = require("clean-css");
{{/image}}
const image = require("@rollup/plugin-image");
{{/image}}
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
    {{#json}}
    json({
      compact: true,
    }),
    {{/json}}
    {{#vue}}
    vue({
      css: false
    }),
    {{/vue}}
    {{#image}}
    image({
      exclude: ["node_modules/**"],
      include: ["src/**"],
    }),
    {{/image}}
    scss({
      output(style) {
        if (!existsSync("dist")) {
          mkdirSync("dist");
        }
        writeFileSync("dist/{{name}}.min.css", new CleanCSS().minify(style).styles);
      },
    }),
    resolve(),
    buble({
      exclude: ["node_modules/**"],
    }),
    commonjs(),
    {{#terser}}
    isProduction && terser(),
    {{/terser}}
  ],
};

const output = {
  name: "{{name}}",
  {{#if_eq module 'es'}}
  file: "dist/library.es.js",
  format: "es"
  {{/if_eq}}
  {{#if_eq module 'umd'}}
  file: "dist/library.umd.js",
  format: "umd"
  {{/if_eq}}
  {{#if_eq module 'cjs'}}
  file: "dist/library.cjs.js",
  format: "cjs"
  {{/if_eq}}
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
