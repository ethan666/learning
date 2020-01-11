import XYZ from "ol/source/XYZ";
import TileGrid from "ol/tilegrid/TileGrid";
import { Projection, addProjection, addCoordinateTransforms } from "ol/proj";
import { applyTransform } from "ol/extent";
import projzh from "projzh";

var extent = [72.004, 0.8293, 137.8347, 55.8271];
var baiduMercator = new Projection({
  code: "baidu",
  extent: applyTransform(extent, projzh.ll2bmerc),
  units: "m"
});

addProjection(baiduMercator);
addCoordinateTransforms(
  "EPSG:4326",
  baiduMercator,
  projzh.ll2bmerc,
  projzh.bmerc2ll
);
addCoordinateTransforms(
  "EPSG:3857",
  baiduMercator,
  projzh.smerc2bmerc,
  projzh.bmerc2smerc
);

var bmercResolutions = new Array(19);
for (var i = 0; i < 19; ++i) {
  bmercResolutions[i] = Math.pow(2, 18 - i);
}

var urls = [0, 1, 2, 3].map(function(sub) {
  return (
    "http://maponline" +
    sub +
    ".bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20191119"
  );
});

const source = new XYZ({
  projection: "baidu",
  maxZoom: 18,
  tileUrlFunction: function(tileCoord) {
    var x = tileCoord[1];
    var y = -tileCoord[2];
    var z = tileCoord[0];
    var hash = (x << z) + y;
    var index = hash % urls.length;
    index = index < 0 ? index + urls.length : index;
    if (x < 0) {
      x = "M" + -x;
    }
    if (y < 0) {
      y = "M" + -y;
    }
    return urls[index]
      .replace("{x}", x)
      .replace("{y}", y)
      .replace("{z}", z);
  },
  tileGrid: new TileGrid({
    resolutions: bmercResolutions,
    origin: [0, 0],
    extent: applyTransform(extent, projzh.ll2bmerc)
  })
});

export default source;
