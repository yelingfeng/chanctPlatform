const path = require('path')

module.exports = options => ({
  port: 5000,
  entry: 'example/index.js',
  dist: 'example/dist',
  html: {
    template: 'index.html'
  },
  postcss: [
    require('postcss-salad')
  ],
  webpack (config) {
    config.externals = {
      moment: 'moment',
      jquery: 'jQuery'
    }
    config.resolve.alias = {
      'vue$': 'vue/dist/vue.esm.js',
      'example': path.resolve('example'),
      'assets': 'example/assets'
    }
    config.resolve.modules.push(path.resolve('src'))
    return config
  }
})
