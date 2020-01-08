<template>
  <div id="app">
    <div id="map" class="map">
    </div>

    <!-- <baidu-map>
      <bm-view class="map"> </bm-view>
      <bm-driving
        start="硚口路"
        end="武珞路"
        startCity="武汉"
        endCity="武汉"
        :auto-viewport="true"
        :waypoints="['呼和浩特', { lng: 112.53, lat: 37.87 }, '陕西兵马俑']"
      ></bm-driving>
    </baidu-map> -->

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

import axios from 'axios'

export default {
  name: "app",
  components: {
  },
  mounted() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: transform([114.25, 30.58], "EPSG:4326", "EPSG:3857"),
        zoom: 10
      }),
      target: "map"
    });

    // this.getLocation();
  },
  data() {
    return {
      map: null,
      center: null,
    };
  },
  methods: {
    getLocation(){
      axios.get('/bdLocation', {
        params:{
          qt: 'ipLocation',   
          t: new Date().getTime()
        }
      })
      .then(function (response) {
        if(response.status === 200){
          return response.data
        }
        throw "request error"
        // handle success
      })
      .then(data => {
        const { ipLoc } = data
        const { content } = ipLoc
        const { location } = content
        const {lng, lat} = location
        return [lng/100000, lat/100000]
      })
      // .then(data => {
      //   const { rgc } = data
      //   if(rgc && rgc.code === 0){
      //     return rgc.result
      //   }
      //   throw "rgc error"
      // })
      // .then(result => {
      //   const {location} = result
      //   const {lng, lat} = location
      //   return [lng, lat]
      // })
      .then(center => {
        const view = this.map.getView()
        view.setCenter(transform(center, "EPSG:4326", "EPSG:3857"))
        view.setZoom(12)
      })
      .catch(function (error) {
        // handle error
        console.log(`error:${error}`);
      })
      .finally(function () {
        // always executed
      });
    },
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
  height: 400px;
}
#mapType {
  margin-top: 10px;
}
</style>
