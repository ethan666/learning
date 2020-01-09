module.exports = {
  devServer: {
    proxy: {
      "/direction": {
        target: "http://api.map.baidu.com"
      },
      "/place": {
        target: "http://api.map.baidu.com"
      }
    }
  }
};
