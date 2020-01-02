<template>
  <div id="app">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { getWidth, getTopLeft } from "ol/extent";
import TileLayer from "ol/layer/Tile";
import { get as getProjection, transform } from "ol/proj";
import OSM from "ol/source/OSM";
import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";

export default {
  name: "app",
  mounted() {
    var projection = getProjection("EPSG:4326");
    var projectionExtent = projection.getExtent();
    // var size = getWidth(projectionExtent) / 256;
    var resolutions = new Array(18);
    var matrixIds = new Array(18);
    for (var z = 0; z < 18; ++z) {
      // generate resolutions and matrixIds arrays for this WMTS
      resolutions[z] = 0.5948652514575701 / Math.pow(2, z);
      matrixIds[z] = z;
    }

    var map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
          opacity: 0.7
        }),
        new TileLayer({
          opacity: 0.7,
          source: new WMTS({
            url:
              "http://www.geodata.gov.cn/arcgis/rest/services/wmtstest2411/MapServer/WMTS",
            layer: "wmtstest2411",
            format: "image/png",
            matrixSet: "default028mm",
            request: "GetTitle",
            projection: projection,
            tileGrid: new WMTSTileGrid({
              extend: [-180.0, -90.0, 180.01985289953814, 89.98938006666276],
              resolutions: resolutions,
              matrixIds: matrixIds,
              origin: [-400, 400]
            }),
            style: "default",
            wrapX: true
          })
        })
      ],
      target: "map",
      view: new View({
        center: transform([110, 30], "EPSG:4326", "EPSG:3857"),
        zoom: 4
      })
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.map {
  width: 100%;
  height: 600px;
}
</style>
