const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "cheap-module-eval-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx)$/,
        use: "ts-loader",
        exclude: ["node_modules"]
      }
    ]
  },
  plugins: [new webpack.EnvironmentPlugin(["API_BASE_URL", "SPA_BASE_URL"])],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  }
};
