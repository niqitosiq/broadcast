const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: [
        'C:\\work\\vue\\broadcast\\src\\styles\\*.sass'
      ]
    },
    moment: {
      locales: [
        'ru en'
      ]
    }
  }
}
