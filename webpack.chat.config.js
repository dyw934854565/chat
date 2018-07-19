var config = {
  entry: "./index.src.js",
  output: {
    path: __dirname,
    filename: "chat.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};

module.exports = config;
