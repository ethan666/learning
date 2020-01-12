<template>
  <div id="app">
    <div id="map" class="map"></div>

    <select id="mapType" name="mapTypes" @change="changeTile">
      <option selected value="1">osm</option>
      <option value="2">google</option>
      <option value="3">baidu</option>
    </select>
    <select name="places" id="places" @change="changePlace">
      <option v-for="(place, index) in places" :key="index" :value="index+''">{{place.name}}</option>
    </select>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Feature from 'ol/Feature';
import OSM from "ol/source/OSM";
import VectorSource from 'ol/source/Vector'
import Point from 'ol/geom/Point'

import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import {Style, Fill, Stroke, Text, Circle} from 'ol/style'

import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmView from "vue-baidu-map/components/map/MapView.vue";
import BmDriving from "vue-baidu-map/components/search/Driving.vue";

import { transform } from "ol/proj";
import baiduSource from "./source/baidu";
import googleSource from './source/google'

import axios from "axios";

export default {
  name: "app",
  components: {},
  mounted() {
    this.tileLayer = new TileLayer({
      source: new OSM()
    });

    this.vSource = new VectorSource()
    const vLayer = new VectorLayer({
      source: this.vSource,
      // style:new Style(
      //   {
      //     image: new Circle({
      //       radius: 10,
      //       fill: new Fill({
      //         color: 'rgba(255,255,255,0.5)'
      //       }),
      //       stroke: new Stroke({
      //         color: '#f00',
      //         width: 2
      //       })
      //     })
      //   }
      // )
      style: function(feature) {
        const fill = new Fill({
          color: 'rgba(255,0,0,0.4)'
        });
        const stroke = new Stroke({
          color: '#f00',
          width: 2
        });
        const style = new Style({
          image: new Circle({
            radius: 10,
            fill,
            stroke
          })
        })
        return style
      }
    })
    this.map = new Map({
      layers: [this.tileLayer, vLayer],
      view: new View({
        center: transform([114.25, 30.58], "EPSG:4326", "EPSG:3857"),
        zoom: 15
      }),
      target: "map"
    });

    // this.getLocation();
  },
  data() {
    return {
      map: null,
      tileLayer: null,
      vSource:null,
      center: null,
      places:[
        {
          name:'自由女神像',
          location:{
            lng: -74.0466891,
            lat: 40.6892534
          }
        },
        {
// 谷歌地图：30.5761034200,114.2527472200
// 百度地图：30.5823360000,114.2591700000
          name:'武汉城市广场',
          location:{
            lng: 114.2527472200,
            lat: 30.5761034200
          }
        },
      ]
    };
  },
  methods: {
    changeTile(event) {
      const type = event.target.value;
      if (this.tileLayer) {
        this.map.removeLayer(this.tileLayer);
        this.tileLayer = null;
      }
      const layers = this.map.getLayers();

      if (type === "1") {
        this.tileLayer = new TileLayer({
          source: new OSM()
        });
      }else if(type === "2"){
        this.tileLayer = new TileLayer({
          source:googleSource
        })
      }
       else if (type === "3") {
        this.tileLayer = new TileLayer({
          source: baiduSource
        });
      }
      if (this.tileLayer) {
        layers.insertAt(0, this.tileLayer);
      }
    },
    changePlace(event){
      const value = event.target.value;
      const place = this.places[Number(value)]
      const { location } = place
      this.drawPlace(location)
    },
    drawPlace(location){
      this.vSource.clear();
      const {lng, lat} = location
      const coordinates = transform([lng, lat], "EPSG:4326", "EPSG:3857")
      const feature = new Feature(new Point(coordinates))
      this.vSource.addFeature(feature)
      
      const view = this.map.getView()
      view.setCenter(coordinates)
      view.setZoom(15)
    },
    getLocation() {
      axios
        .get("/bdLocation", {
          params: {
            qt: "ipLocation",
            t: new Date().getTime()
          }
        })
        .then(function(response) {
          if (response.status === 200) {
            return response.data;
          }
          throw "request error";
          // handle success
        })
        .then(data => {
          const { ipLoc } = data;
          const { content } = ipLoc;
          const { location } = content;
          const { lng, lat } = location;
          return [lng / 100000, lat / 100000];
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
          const view = this.map.getView();
          view.setCenter(transform(center, "EPSG:4326", "EPSG:3857"));
          view.setZoom(12);
        })
        .catch(function(error) {
          // handle error
          console.log(`error:${error}`);
        })
        .finally(function() {
          // always executed
        });
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
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.map {
  width: 80%;
  height: 500px;
}
#mapType {
  margin: 10px 0 0 20px;
}
#places{
  margin: 10px 0 0 10px;
}
</style>
