<template>
  <div id="app">
    <div id="map" class="map"></div>
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

import { transform } from "ol/proj";

export default {
  name: "App",
  mounted() {
    // var vectorSource = new VectorSource({
    //   format: new GeoJSON(),
    //   url: function(extent) {
    // return (
    //   "http://www.geodata.gov.cn/arcgis/services/re2411/MapServer/WFSServer?service=WFS&" +
    //   "version=2.0.0&request=GetFeature&typename=一带一路国家3300W&startIndex=2&count=2"
    // );
    // return (
    //   "http://www.geodata.gov.cn/arcgis/services/re2411/MapServer/WFSServer?service=WFS&" +
    //   "version=1.1.0&request=GetFeature&typename=osm:一带一路国家3300W&startIndex=2&count=2"
    // );
    // return "http://www.geodata.gov.cn/arcgis/services/re2411/MapServer/WFSServer?service=WFS&version=2.0.0&REQUEST=DescribeFeatureType&typeName=一带一路国家3300W";
    // 加载耗时17s，failed to load data. 报跨域问题
    // return (
    //   "http://www.geodata.gov.cn/arcgis/services/re2411/MapServer/WFSServer?service=WFS&" +
    //   "version=1.1.0&request=GetFeature&typename=osm:一带一路国家3300W&" +
    //   "srsname=EPSG:4326&filter=<Filter><Within><PropertyName>土耳其</PropertyName><gml:Envelope><gml:lowerCorner>10,10</gml:lowerCorner> <gml:upperCorner>20 20</gml:upperCorner></gml:Envelope></Within></Filter>"
    // );
    // return (
    //   "http://www.geodata.gov.cn/arcgis/services/re2411/MapServer/WFSServer?service=WFS&" +
    //   "version=1.1.0&request=GetFeature&typename=osm:一带一路国家3300W&" +
    //   "srsname=EPSG:4326&filter=" +
    //   equalTo("国家", "土耳其")
    // );
    // citiesM
    // return (
    //   "http://www.geodata.gov.cn/arcgis/services/re2411/MapServer/WFSServer?service=WFS&" +
    //   "version=1.1.0&request=GetFeature&typename=citiesM&" +
    //   "srsname=EPSG:4326&" +
    //   "bbox=" +
    //   extent.join(",") +
    //   ",EPSG:4326"
    // );
    //   },
    //   strategy: bboxStrategy
    // });

    // var vectorSource = new VectorSource({
    //   format: new GeoJSON(),
    //   url: function(extent) {
    //     return (
    //       "http://www.geodata.gov.cn/arcgis/services/re2411/MapServer/WFSServer?service=WFS&" +
    //       "version=1.1.0&request=GetFeature&typename=citiesM&" +
    //       "srsname=EPSG:4326&" +
    //       "bbox=" +
    //       extent.join(",") +
    //       ",EPSG:4326"
    //     );
    //   },
    //   strategy: bboxStrategy
    // });

    var vectorSource = new VectorSource();

    var vector = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: "rgba(0, 0, 255, 1.0)",
          width: 2
        })
      })
    });

    var raster = new TileLayer({
      source: new BingMaps({
        imagerySet: "Aerial",
        key: "Your Bing Maps Key from http://www.bingmapsportal.com/ here"
      })
    });

    var map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        raster,
        vector
      ],
      target: "map",
      view: new View({
        // center: transform([110, 30], "EPSG:4326", "EPSG:3857"),
        center: [110, 30],
        projection: "EPSG:4326",
        zoom: 6
      })
    });

    var featureRequest = new WFS().writeGetFeature({
      featureNS: "http://openstreemap.org",
      srsName: "EPSG:4326",
      featurePrefix: "re2411",
      featureTypes: ["一带一路国家3300W"],
      outputFormat: "gml3",
      filter: likeFilter("NAME", "土耳其")
    });

    // var featureRequest = new WFS().writeGetFeature({
    //   featureNS: "http://openstreemap.org",
    //   srsName: "EPSG:4326",
    //   featurePrefix: "re2411",
    //   featureTypes: ["citiesM"],
    //   outputFormat: "gml3"
    // });

    // then post the request and add the received features to a layer
    fetch("/arcgis/services/re2411/MapServer/WFSServer", {
      method: "POST",
      body: new XMLSerializer().serializeToString(featureRequest)
    })
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        var features = new WFS().readFeatures(text);
        vectorSource.addFeatures(features);
        map.getView().fit(vectorSource.getExtent());
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
}

.map {
  width: 100%;
  height: 600px;
}
</style>
