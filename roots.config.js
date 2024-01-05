const path = require('path')

module.exports = {
  originDir: path.resolve(__dirname, 'src/roots'),
  localizedDir: path.resolve(__dirname, 'src/app/(routes)'),
  locales: ['en', 'de'],
  defaultLocale: 'en',
  prefixDefaultLocale: false, // serves "en" locale on / instead of /en
}