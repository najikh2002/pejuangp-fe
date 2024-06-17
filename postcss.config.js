module.exports = {
  postcssOptions: {
    plugins: [
      // daftar plugin PostCSS yang Anda gunakan
      require('autoprefixer'),
      require('postcss-preset-env')({
        stage: 1,
      }),
    ],
  },
};
