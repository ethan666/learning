module.exports = {
    devServer: {
      proxy: {
        "/baidumap": {
          target: "https://map.baidu.com",
          pathRewrite: {
            "^/baidumap": ""
          }
        }
      }
    },
    productionSourceMap: false,
    lintOnSave: undefined
}