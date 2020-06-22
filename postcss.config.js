const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer({
      grid: true,
    }),
    require('postcss-flexbugs-fixes'),
  ],
}
