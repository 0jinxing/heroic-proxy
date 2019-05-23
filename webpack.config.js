const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve("src/index.js"),
    background: path.resolve("src/background.js")
  },
  output: {
    filename: "[name].js",
    path: path.resolve("build")
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: { loader: "file-loader" }
      },
      {
        test: /\.pac$/,
        use: { loader: "raw-loader" }
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve("public"),
        ignore: "template.html"
      }
    ]),
    new HtmlWebPackPlugin({
      template: path.resolve("public/template.html"),
      filename: "index.html",
      chunks: ["index"],
      hash: true,
      title: "Oh Proxy Options",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ]
};