const filter = (pathname, req) => {
  console.log("test::" + req.params);
  return pathname.match("qt=ipLocation") && req.method === "GET";
};

module.exports = {
  devServer: {
    proxy: {
      "qt=ipLocation": {
        target: "https://map.baidu.com",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
