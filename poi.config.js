const path = require('path')

module.exports = options => ({
  port: 5000,
  postcss: [
    require('postcss-salad')
  ],
  webpack (config) {
    config.resolve.modules.push(path.resolve('src'))
    return config
  }
})
