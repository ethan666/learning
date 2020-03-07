const CompressionPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    '@antv/data-set': 'DataSet',
    axios: 'axios'
  },
  css: [
    '//cdn.jsdelivr.net/npm/ol@6.1.1/ol.css'
  ],
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/@antv/data-set@0.10.2/build/data-set.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
  ]
}

module.exports = {
  chainWebpack: (config) => {
    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },
  configureWebpack: () => {
    if (isProd) {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ],
        externals: assetsCDN.externals
      }
    }
    return {}
  },
  devServer: {
    port: 9100,
    proxy: {
      '/baidumap': {
        target: 'https://map.baidu.com',
        pathRewrite: {
          '^/baidumap': ''
        }
      }
    }
  },
  productionSourceMap: false,
  lintOnSave: undefined
}
