var webpack = require('webpack');
var UnminifiedWebpackPlugin = require("unminified-webpack-plugin");
var path = require("path");
var VueLoaderPlugin = require("vue-loader/lib/plugin");

var config = {
  entry: {
    index: "./src/index.js",
    vue: "./src/vue.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
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
        test: /\.vue$/,
        loader: "vue-loader",
        options: {}
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  devtool: "source-map",
  plugins: [
    new VueLoaderPlugin(),
    new UnminifiedWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  ]
};

module.exports = config;
