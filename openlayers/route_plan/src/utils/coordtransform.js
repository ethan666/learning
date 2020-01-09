const coordtransform = require("coordtransform");

coordtransform.bd09towgs84 = function(lng, lat) {
  const gcj = this.bd09togcj02(lng, lat);
  return this.gcj02towgs84(...gcj);
};

export default coordtransform;
