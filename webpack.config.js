const path = require("path");
const HtmlWebpackPlugin = require("webpack-html-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.ts"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: "ts-loader",
        exclude: [/node_modules/, /\.spec\./i],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      hash: true,
    }),
  ],
};
