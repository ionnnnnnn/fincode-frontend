const path = require('path')

function resolve(filename) {
  return path.join(__dirname, filename)
}

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(match => {
      config.module
        .rule('less')
        .oneOf(match)
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [resolve('./src/assets/global.less')]
        })
    })
  },
  devServer: {
    open: true,
    port: 8091,
    proxy: {
      '/api': {
        target: 'http://172.29.4.32:8090/',
        // target: 'http://localhost:8090/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
