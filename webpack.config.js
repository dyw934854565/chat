var config = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "index.js",
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
  }
};

module.exports = config;
