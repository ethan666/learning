<template>
  <div id="app">
    <div id="map" class="map"></div>
    <select name="mapTypes" id="mapType">
      <option selected value="1">osm</option>
      <option value="2">google</option>
      <option value="3">baidu</option>
    </select>
  </div>
</template>

<script>
import Vue from "vue";
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
import TileGrid from "ol/tilegrid/TileGrid";
import TileImage from "ol/source/TileImage";

import Projection from "ol/proj/Projection";
import Tile from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { applyTransform } from "ol/extent";

import axios from "axios";
import projzh from "projzh";
import {
  get as getProjection,
  transform,
  addProjection,
  addCoordinateTransforms
} from "ol/proj";

export default {
  name: "app",
  mounted() {
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

    var urls = [0, 1, 2, 3, 4].map(function(sub) {
      return (
        "http://shangetu" +
        sub +
        ".map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&udt=20150601"
      );
    });

    var baidu = new Tile({
      source: new XYZ({
        projection: "baidu",
        maxZoom: 18,
        tileUrlFunction: function(tileCoord) {
          var x = tileCoord[1];
          var y = tileCoord[2];
          var z = tileCoord[0];
          var hash = (x << z) + y;
          var index = hash % urls.length;
          index = index < 0 ? index + urls.length : index;
          return urls[index]
            .replace("{x}", x)
            .replace("{y}", y)
            .replace("{z}", z);
        },
        tileGrid: new TileGrid({
          resolutions: bmercResolutions,
          origin: [0, 0],
          extent: applyTransform(extent, projzh.ll2bmerc),
          tileSize: [256, 256]
        })
      })
    });

    var map = new Map({
      layers: [baidu],
      view: new View({
        center: transform([110, 30], "EPSG:4326", "EPSG:3857"),
        zoom: 4
      }),
      target: "map"
    });
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
</style>
