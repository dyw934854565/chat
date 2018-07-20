var webpack = require('webpack');
var UnminifiedWebpackPlugin = require("unminified-webpack-plugin");

var config = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "index.min.js",
    library: "Chat",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new UnminifiedWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  ]
};

module.exports = config;
