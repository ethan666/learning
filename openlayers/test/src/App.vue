<template>
  <div id="app">
    <div id="map" class="map"></div>
    <button @click="move">移动</button>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import {
  equalTo as equalToFilter,
  like as likeFilter,
  and as andFilter
} from "ol/format/filter";
import { WFS, GeoJSON } from "ol/format";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import BingMaps from "ol/source/BingMaps";
import VectorSource from "ol/source/Vector";
import { Stroke, Style } from "ol/style";
import { transform, fromLonLat } from "ol/proj";
import {
  defaults as defaultControls,
  MousePosition,
  ScaleLine
} from 'ol/control'
import { createStringXY } from 'ol/coordinate'
import { XYZ } from 'ol/source'
import {
  transform as gtransform,
  GCJ02,
  BD09,
  EPSG3857,
  WGS84
} from 'gcoord'

export default {
  name: "App",
  mounted() {
    this.view = null
    this.initMap()
  },
  methods: {
    initMap(){
      const london = fromLonLat([-0.12755, 51.507222]);
      const moscow = fromLonLat([37.6178, 55.7517]);
      const istanbul = fromLonLat([28.9744, 41.0128]);
      const rome = fromLonLat([12.5, 41.9]);
      const bern = fromLonLat([7.4458, 46.95]);
      
      const view = new View({
        center: transform([114.25927762658, 30.580697824766], 'EPSG:4326', 'EPSG:3857'),
        projection: 'EPSG:3857',
        zoom: 6,
      });
      this.view = view

      const raster = new TileLayer({
        source: new XYZ({
          url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
          minZoom: 4,
          crossOrigin: 'anonymous'
        })
      })
      
      const map = new Map({
        controls: defaultControls().extend([
          new ScaleLine(),
          // new MousePosition({
          //   coordinateFormat: createStringXY(8),
          //   projection: 'EPSG:4326',
          //   undefinedHTML: '&nbsp;'
          // })
        ]),        
        target: 'map',
        layers: [ raster ],
        view: view,
      });
    },
    move(){
      // 百度地图拿到的坐标, 使用坐标系待确认
      const bc = [114.25927762658, 30.580697824766]
      let tt = bc
      tt = gtransform(tt, BD09, GCJ02)
      tt = gtransform(tt, GCJ02, WGS84)
      tt = gtransform(tt, WGS84, EPSG3857)
      this.view.animate({
        center: tt,
        duration: 500,
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
  text-align: center;
  color: #2c3e50;
}

.map {
  width: 100%;
  height: 450px;
}
</style>
