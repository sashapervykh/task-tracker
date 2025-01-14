const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  return {
    mode: env.mode ?? "production",
    entry: path.resolve(__dirname, "src", "script.js"),
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
    ],
    optimization: {
      runtimeChunk: "single",
    },
  };
};
