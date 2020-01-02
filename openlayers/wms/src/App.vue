<template>
  <div id="app">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";
import { transform } from "ol/proj";

export default {
  name: "app",
  mounted() {
    var layers = [
      new TileLayer({
        source: new OSM()
      }),
      new TileLayer({
        source: new TileWMS({
          url:
            "http://www.geodata.gov.cn/mapserver/wms/services/1999zblx/WMSServer",
          params: {
            // TILED: true,
            LAYERS: "1999zblx",
            REQUEST: "GetMap",
            VERSION: "1.1.1"
            // FORMAT: "image/png",
            // TRANSPARENT: true
          },
          projection: "EPSG:4326",
          // Countries have transparency, so do not fade tiles:
          transition: 0
        })
      })
    ];
    new Map({
      layers: layers,
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
