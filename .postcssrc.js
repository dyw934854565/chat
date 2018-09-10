module.exports = {
  plugins: {
    precss: {},
    autoprefixer: {
      browsers: [
        "> 1%",
        "last 2 versions",
        "Android >= 3.2",
        "Firefox >= 20",
        "iOS > 7",
        "ie >= 8"
      ]
    },
    cssnano: {}
  }
};
