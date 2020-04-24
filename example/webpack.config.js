const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const config = require('./config')
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "main.js"),
  output: {
    filename: "[name]_[hash:16].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: "file-loader",
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".js", ".json", ".vue", ".scss"],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running at ${config.devServer.host}:${config.devServer.port} `],
      },
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "demo",
      template: path.resolve(__dirname, "./index.html"),
      filename: "index.html",
      inject: "body",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    ...config.devServer
  }
};
