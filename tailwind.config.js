module.exports = {
  purge: ['./**/*.html'],
  content: ['./**/*.html', './**/*.js', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
      },
      fontFamily: {
        'sans': ['Montserrat'],
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
