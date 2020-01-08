
module.exports = {
  devServer: {
    proxy: {
      "/bdLocation": {
        target: "https://map.baidu.com",
        ws: true,
        changeOrigin: true,
        pathRewrite : {
          '^/bdLocation' : ''
        }
      }
    }
  }
};
