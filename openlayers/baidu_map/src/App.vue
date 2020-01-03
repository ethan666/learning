<template>
  <div id="app">
    <!-- <div id="map" class="map">
      <bm-driving
        start="新街口"
        end="新街口"
        startCity="北京"
        endCity="南京"
        :auto-viewport="true"
        :waypoints="['呼和浩特', { lng: 112.53, lat: 37.87 }, '陕西兵马俑']"
      ></bm-driving>
    </div> -->

    <baidu-map>
      <bm-view class="map"> </bm-view>
      <bm-driving
        start="硚口路"
        end="武珞路"
        startCity="武汉"
        endCity="武汉"
        :auto-viewport="true"
        :waypoints="['呼和浩特', { lng: 112.53, lat: 37.87 }, '陕西兵马俑']"
      ></bm-driving>
    </baidu-map>

    <select id="mapType" name="mapTypes" @change="changeMapImg">
      <option selected value="1">osm</option>
      <option value="2">google</option>
      <option value="3">tdt</option>
    </select>
  </div>
</template>

<script>
import "ol/ol.css";
import Vue from "vue";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import { Tile as TileLayer } from "ol/layer";

import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmView from "vue-baidu-map/components/map/MapView.vue";
import BmDriving from "vue-baidu-map/components/search/Driving.vue";

import { transform } from "ol/proj";

// Vue.use(BaiduMap, {
//   ak: "0ec6jPcr5k4yloyilfZQchyvnMCuDyhR"
// });

export default {
  name: "app",
  components: {
    BaiduMap,
    BmView,
    BmDriving
  },
  mounted() {
    // this.map = new Map({
    //   layers: [
    //     new TileLayer({
    //       source: new OSM()
    //     })
    //   ],
    //   view: new View({
    //     center: transform([110, 30], "EPSG:4326", "EPSG:3857"),
    //     zoom: 4
    //   }),
    //   target: "map"
    // });
  },
  data() {
    return {
      map: null
    };
  },
  methods: {
    changeMapImg(event) {
      const value = event.target.value;
      console.log(`value:${value}`);
      const layers = this.map.getLayers();
      layers.forEach(layer => {
        this.map.removeLayer(layer);
      });
      if (value === "3") {
        var tianMapSat = new TileLayer({
          title: "天地图卫星",
          source: new TianMap({ mapType: "sat" })
        });
        this.map.addLayer(tianMapSat);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.map {
  width: 100%;
  height: 600px;
}
#mapType {
  margin-top: 10px;
}
</style>
