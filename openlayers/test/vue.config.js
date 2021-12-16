module.exports = {
  devServer: {
    proxy: {
      "/arcgis": {
        target: "http://www.geodata.gov.cn"
        // ws: true,
        // changeOrigin: true
      }
    }
  }
};
