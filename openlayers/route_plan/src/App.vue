<template>
  <div id="app">
    <div id="map" class="map"></div>
    <div class="dribox">
      <div class="line-search">
        <div class="input-area">
          <div class="icon_exchange" @click="onExchange">
            <a-icon type="home"></a-icon>
          </div>
          <div class="line-search-form">
            <p class="line_serch_ipt">
              <label for="line-start">起</label>
              <input
                id="line-start"
                type="text"
                placeholder="请输入起点"
                autocomplete="off"
                v-model="origin.name"
                @input="onLineStartChange"
                @focusin="onInputStartFocusin"
                @focusout="onInputStartFocusout"
              />
              <span
                class="del-item"
                v-if="startCloseVisible"
                @click="onClearStartInput"
              ></span>
            </p>
            <p class="line_serch_ipt">
              <label for="line-end">终</label>
              <input
                id="line-end"
                type="text"
                placeholder="请输入终点"
                autocomplete="off"
                v-model="destination.name"
                @input="onLineEndChange"
                @focusin="onInputEndFocusin"
                @focusout="onInputEndFocusout"
              />
              <span
                class="del-item"
                v-if="endCloseVisible"
                @click="onClearEndInput"
              ></span>
            </p>
            <p class="line-search-submit">
              <button class="dir_submit" @click="queryLineHandler">
                开车去
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="box-down">
        <div class="plan-wrap">
          <a-radio-group v-model="methodsIndex" @change="onChangeMethod">
            <a-radio-button :value="0">推荐方案</a-radio-button>
            <a-radio-button :value="4">高速优先</a-radio-button>
            <a-radio-button :value="5">躲避拥堵</a-radio-button>
          </a-radio-group>

          <div v-for="(plan, index) in plans" :key="index">
            <div
              class="planTitle dirtag"
              :class="{ current: index === planIndex }"
              @click="openPlanDetail(plan, index)"
            >
              <p class="dir_tag">{{ plan.tag }}</p>
              <p class="dir_base_info">
                {{
                  `约${Math.round(plan.duration / 60)}分钟 | ${(
                    plan.distance / 1000
                  ).toFixed(1)}公里`
                }}
              </p>
              <p class="dir_passby" :title="getPassby(plan.steps, true)">
                {{ `途径：${getPassby(plan.steps)}` }}
              </p>
            </div>
            <dl class="steps" v-if="plan.open">
              <dt class="start" :title="origin.name">
                <span class="name">{{ `从 ${origin.name}出发` }}</span>
              </dt>
              <dt
                class="route"
                v-for="(step, si) in plan.steps"
                :key="si"
                :class="{
                  'turn-0': step.direction === 0,
                  'turn-1': step.direction === 1,
                  'turn-2': step.direction === 2,
                  'turn-3': step.direction === 3,
                  'turn-4': step.direction === 4,
                  'turn-5': step.direction === 5,
                  'turn-6': step.direction === 6,
                  'turn-7': step.direction === 7,
                  'turn-8': step.direction === 8,
                  'turn-9': step.direction === 9,
                  'turn-10': step.direction === 10,
                  'turn-11': step.direction === 11
                }"
              >
                <p class="name">{{ step.road_name }}</p>
                <p class="distance grey">{{ `${step.distance}米` }}</p>
              </dt>
              <dt class="end" :title="destination.name">
                <span class="name">{{ `到达终点 ${destination.name}` }}</span>
              </dt>
            </dl>
          </div>
        </div>
        <ul class="search_place_result" v-if="searchResultVisible">
          <li
            v-for="(resultItem, index) in searchResultData"
            :key="index"
            @click="onSelectSearchResult(resultItem)"
          >
            <span class="name">{{ resultItem.name }}</span>
            <span class="address">{{
              resultItem.province + resultItem.city + resultItem.district
            }}</span>
          </li>
        </ul>
        <div class="dirtips_item dirlocSug" v-if="locsugVisible">
          <a href="javascript:void(0)" id="locsug" @click="onLocsug"
            >我的位置</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import Vue from "vue";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";

import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import Feature from "ol/Feature";
import Vector from "ol/source/Vector";
import { Style, Circle, Fill, Text, Stroke } from "ol/style";

import { transform } from "ol/proj";
import { driving, placeSuggestion } from "./api/baidu";

import coordtransform from "./utils/coordtransform";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.use(Antd);

export default {
  name: "app",
  components: {},
  mounted() {
    const layers = [
      new TileLayer({
        source: new OSM()
      })
    ];

    this.map = new Map({
      layers: layers,
      target: "map",
      view: new View({
        center: transform([114.30931, 30.57593], "EPSG:4326", "EPSG:3857"),
        zoom: 10
      })
    });
  },
  data() {
    return {
      map: null,
      vectorroute: null,
      // vectorHandselectstart: null,
      // vectorHandselectend: null,
      // vectorresaw: null,
      methodsIndex: 0, //选择方案值，比如推荐方案、避免拥堵
      planIndex: 0, //路线方案索引，比如路线1、路线2
      origin: {
        name: "武汉城市广场",
        location: { lat: 30.57854, lng: 114.247345 }
      },
      destination: {
        name: "光谷广场-地铁站",
        location: { lat: 30.511721, lng: 114.403939 }
      },
      locsug: {
        name: "我的位置",
        location: { lat: 30.57854, lng: 114.247345 }
      },
      startCloseVisible: true,
      endCloseVisible: true,
      plans: [],
      searchResultVisible: false,
      searchResultData: [],
      searchType: -1, // 搜索的类型，0表示起点，1表示终点
      locsugVisible: false
    };
  },
  methods: {
    getPassby(steps, isTitle = false) {
      let str = "";
      steps.forEach((item, index) => {
        if (isTitle || index < 3) {
          str += item.road_name + ">";
        }
      });
      return str.substr(0, str.length - 1);
    },
    onExchange() {
      let temp = this.origin;
      this.origin = this.destination;
      this.destination = temp;
    },
    onLocsug() {
      console.log("onLocsug:" + this.searchType);
      if (this.searchType === 0) {
        //需要深度复制
        this.origin = this.locsug;
        this.startCloseVisible = true;
      } else if (this.searchType === 1) {
        //需要深度复制
        this.destination = this.locsug;
        this.endCloseVisible = true;
      }
      this.locsugVisible = false;

      this.queryDrivingAndDraw();
    },
    onClearStartInput() {
      this.origin = {};
      this.startCloseVisible = false;
    },
    onClearEndInput() {
      this.destination = {};
      this.endCloseVisible = false;
    },
    onSelectSearchResult(result) {
      const { name, location } = result;

      const rl = coordtransform.gcj02towgs84(location.lng, location.lat);
      // 坐标转化，转为WGS84
      const nl = { lng: rl[0], lat: rl[1] };
      if (this.searchType === 0) {
        this.origin = { name, location: nl };
      } else if (this.searchType === 1) {
        this.destination = { name, location: nl };
      }
      this.searchResultVisible = false;
      this.searchType = -1;

      // 开始查询
      this.queryDrivingAndDraw();
    },
    onLineStartChange(event) {
      const value = event.target.value;
      this.searchType = 0;
      if (!value) {
        this.locsugVisible = true;
        this.startCloseVisible = false;
        return;
      }
      this.origin.location = null;
      this.locsugVisible = false;
      this.startCloseVisible = true;
      this.searchResultVisible = true;
      placeSuggestion(value)
        .then(res => {
          if (res.status === 200) {
            return res.data;
          }
        })
        .then(data => {
          if (data.status === 0) {
            this.searchResultData = data.result;
          }
        });
    },
    onLineEndChange(event) {
      const value = event.target.value;
      this.searchType = 1;
      if (!value) {
        this.locsugVisible = true;
        this.endCloseVisible = false;
        return;
      }
      this.destination.location = null;
      this.locsugVisible = false;
      this.endCloseVisible = true;
      this.searchResultVisible = true;
      placeSuggestion(value)
        .then(res => {
          if (res.status === 200) {
            return res.data;
          }
        })
        .then(data => {
          if (data.status === 0) {
            this.searchResultData = data.result;
          }
        });
    },
    onInputStartFocusin(event) {
      const value = event.target.value;
      if (!value) {
        this.locsugVisible = true;
      }
      this.searchType = 0;
    },
    onInputStartFocusout(event) {
      if (event.relatedTarget && event.relatedTarget.id !== "locsug") {
        this.locsugVisible = false;
      }
    },
    onInputEndFocusin(event) {
      const value = event.target.value;
      if (!value) {
        this.locsugVisible = true;
      }
      this.searchType = 1;
    },
    onInputEndFocusout(event) {
      if (event.relatedTarget && event.relatedTarget.id !== "locsug") {
        this.locsugVisible = false;
      }
    },
    openPlanDetail(plan, index) {
      // 当前索引

      if (index === this.planIndex) {
        plan.open = !plan.open;
        this.plans = [...this.plans];
      } else {
        const oldPlan = this.plans[this.planIndex];
        oldPlan.open = false;
        plan.open = true;
        this.planIndex = index;
        this.plans = [...this.plans];

        //地图切换路线
        this.handleRoute(this.plans, this.planIndex);
      }
    },
    onChangeMethod() {
      this.planIndex = 0;
      this.queryDrivingAndDraw();
    },
    queryDrivingAndDraw() {
      //检查起点、终点数据是否完善
      if (!this.origin.location || !this.destination.location) {
        console.log("起点或者终点数据不完整");
        return;
      }

      const start = `${this.origin.location.lat},${this.origin.location.lng}`;
      const end = `${this.destination.location.lat},${this.destination.location.lng}`;
      driving(start, end, this.methodsIndex)
        .then(res => {
          if (res.status === 200) {
            return res.data;
          }
          console.log("request status:" + res.status);
        })
        .then(data => {
          if (data.status === 0) {
            this.plans = data.result.routes;
            this.handleRoute(this.plans, this.planIndex);
          }
        });
    },
    queryLineHandler() {
      this.onChangeMethod();
    },
    handleRoute(routes, index) {
      if (index === undefined) {
        index = 0; // 默认选择第一条路线
      }
      if (this.vectorroute !== null) {
        // 消除上一次生成的路线
        this.map.removeLayer(this.vectorroute);
      }
      // if (this.vectorHandselectstart !== null) {
      //   // 消除点击生成的起点坐标，否则会有偏移
      //   this.map.removeLayer(this.vectorHandselectstart);
      // }
      // if (this.vectorHandselectend !== null) {
      //   // 消除点击生成的终点坐标
      //   this.map.removeLayer(this.vectorHandselectend);
      // }
      // if (this.vectorresaw !== null) {
      //   this.map.removeLayer(this.vectorresaw);
      // }
      let result = routes[index];

      let origin = coordtransform.gcj02towgs84(
        result.origin.lng,
        result.origin.lat
      );
      let startC = origin; // ol.proj.transform([origin[0], origin[1]], 'EPSG:4326', 'EPSG:3857')
      let destination = coordtransform.gcj02towgs84(
        result.destination.lng,
        result.destination.lat
      );
      let endC = destination; // ol.proj.transform([destination[0], destination[1]], 'EPSG:4326', 'EPSG:3857')
      let startF = new Feature(new Point(startC));
      startF.name = "起点";
      let endF = new Feature(new Point(endC));
      endF.name = "终点";
      let features = [startF, endF];
      let steps = result.steps;
      for (let i = 0; i < steps.length; i++) {
        let _step = steps[i];
        let arr = _step.path.split(";");
        let tmcsPaths = arr;
        let _coord = [];
        // console.log(tmcsPaths.length) //每一段道路下具体坐标的数组
        for (let m = 0; m < tmcsPaths.length; m++) {
          let path = tmcsPaths[m]; // 具体点的数组[经度，纬度]
          let _path = path.split(",").map(Number);
          let pathwgs = coordtransform.gcj02towgs84(_path[0], _path[1]);
          _coord.push(
            pathwgs /* ol.proj.transform([pathwgs[0], pathwgs[1]], 'EPSG:4326', 'EPSG:3857') */
          );
          // console.log(pathF.status) //道路状况标识位 0:无路况,1:畅通，2：缓行，3：拥堵，4：非常拥堵
        }
        let pathF = new Feature(new LineString(_coord));
        pathF.status = _step.traffic_condition[0].status;
        pathF.id = "path_" + i;
        features.push(pathF);
      }
      features.forEach(feature => {
        const geo = feature.getGeometry();
        geo.transform("EPSG:4326", "EPSG:3857");
      });
      let vectorSource = new Vector({
        features: features
      });
      this.vectorroute = new VectorLayer({
        source: vectorSource,
        style: function(feature) {
          let name = feature.name;
          let status = feature.status; // feature.get('status')
          // console.log(status)
          name = name ? name.substring(0, 1) : ""; // 只取name的前一个字
          let color = "blue";
          if (name === "起") {
            color = "green";
          } else if (name === "终") {
            color = "red";
          } else {
          }
          let _color = "#8f8f8f";
          if (status === 3) {
            _color = "#e20000";
          } else if (status === 2) {
            _color = "#ff7324";
          } else if (status === 1) {
            _color = "#00b514";
          } else {
            _color = "#67C23A";
          }
          return new Style({
            image: new Circle({
              radius: 15,
              fill: new Fill({
                color: color
              })
            }),
            fill: new Fill({
              color: "#0044CC"
            }),
            stroke: new Stroke({
              color: _color,
              width: 5
            }),
            text: new Text({
              text: name,
              font: "bold 15px 微软雅黑",
              fill: new Fill({
                color: "white"
              }),
              textAlign: "center",
              textBaseline: "middle"
            })
          });
        }
      });
      this.map.addLayer(this.vectorroute);
      const view = this.map.getView();
      let extent = this.vectorroute.getSource().getExtent(); // 合适比例缩放居中
      view.fit(extent, {
        padding: [80, 50, 80, 400],
        minResolution: 50,
        duration: 500
      });
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  height: 600px;
}
.map {
  position: absolute;
  width: 100%;
  height: 600px;
}
.dribox {
  position: absolute;
  width: 360px;
  background: #fff;
  border-radius: 2px 3px 3px 2px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  .line-search {
    position: relative;
    padding: 14px;
    padding-bottom: 68px;
    background: #3d93fd;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    .input-area {
      position: relative;
      margin-top: 45px;
      .icon_exchange {
        position: absolute;
        top: 50%;
        left: 0;
        width: 18px;
        height: 28px;
        margin-top: -14px;
        cursor: pointer;
      }
      .line-search-form {
        margin: 0 30px;
        .line_serch_ipt {
          position: relative;
          height: 34px;
          line-height: 34px;
          width: 270px;
          font-size: 14px;
          color: #acd7ff;
          background-color: #3587eb;
          border-radius: 2px;
          margin-bottom: 10px;
          label {
            margin-left: 10px;
          }
          input {
            width: 78%;
            height: 34px;
            line-height: 32px;
            border: none;
            background: transparent;
            text-indent: 5px;
            color: #acd7ff;
            padding: 0;
            text-overflow: ellipsis;
            white-space: nowrap;
            outline: 0;
            &::placeholder {
              color: #acd7ff;
            }
          }
          .del-item {
            position: absolute;
            height: 14px;
            width: 14px;
            background-image: url("./assets/icon_deleipt.png");
            background-size: 14px 14px;
            background-repeat: no-repeat;
            right: 12px;
            top: 10px;
            cursor: pointer;
          }
        }
        .line-search-submit {
          position: absolute;
          margin-top: 17px;
          border-bottom: none;
          width: 270px;
          .dir_submit {
            float: right;
            padding: 0 25px;
            height: 32px;
            line-height: 32px;
            background-color: #559ffb;
            border: none;
            border-radius: 2px;
            color: #fff;
            font-size: 14px;
            text-decoration: none;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.21);
            cursor: pointer;
          }
        }
      }
    }
  }
  .box-down {
    position: relative;
    height: 300px;
    .plan-wrap {
      position: absolute;
      width: 100%;
      height: 300px;
      overflow: auto;
      padding: 0 14px;
      .planTitle {
        position: relative;
        padding: 24px 10px 16px;
        border-top: 1px solid #f3f3f3;
        background: #fff;
        font-size: 14px;
        cursor: pointer;
        .dir_tag {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 12px;
          height: 23px;
          padding: 0 14px;
          line-height: 23px;
          background: #e0f0ff;
          color: #3c3d3f;
        }
        .dir_base_info {
          display: block;
          font-size: 12px;
          height: 14px;
          line-height: 14px;
          color: #3c3d3f;
          margin: 10px 0;
        }
        .dir_passby {
          font-size: 12px;
          color: #7c7e7d;
          margin: 0;
        }
      }
      .current {
        background: #f4f9fd;
        .dir_tag {
          background: #3d93fd;
          color: #fff;
        }
      }
      .steps {
        font-size: 12px;
        text-indent: 5px;
        dt {
          position: relative;
          margin-left: 35px;
          border-bottom: 1px solid #f0f0f0;

          height: 56px;
          line-height: 28px;
          text-indent: 10px;
          &::before {
            position: absolute;
            top: 50%;
            left: -31px;
            box-sizing: content-box;

            border-radius: 50%;
            background-color: #fff;
            background-position: 50%;
            background-repeat: no-repeat;
            text-indent: 0;
            text-align: center;
            font-size: 12px;
            z-index: 10;

            content: " ";
            margin-top: -10px;
            width: 20px;
            height: 20px;
            line-height: 20px;
            color: #fff;
            background-image: url("./assets/diricon.png");
            background-size: 671px 238px;
          }
          &:not(:last-child)::after {
            position: absolute;
            content: " ";
            top: 20px;
            left: -22px;
            height: 105%;
            width: 4px;
            z-index: 9;
            background-color: #e5e7e8;
          }
        }
        .start {
          line-height: 56px;
          &::before {
            background-position: -47px -104px;
          }
        }
        .end {
          line-height: 56px;
          &::before {
            background-position: -126px -104px;
          }
        }
        .route {
          .name {
            margin: 0;
          }
          .distance {
            line-height: 14px;
            margin: 0;
            color: #999;
          }
        }
        .turn-0,
        .turn-1,
        .turn-2,
        .turn-3,
        .turn-4,
        .turn-5,
        .turn-6,
        .turn-7,
        .turn-8,
        .turn-9,
        .turn-10,
        .turn-11 {
          &::before {
            background-position: -124px -23px;
            border: 1px solid #ddd;
            width: 21px;
            height: 21px;
            margin-top: -12px;
          }
        }
        .name {
          color: #565656;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .search_place_result {
      position: absolute;
      z-index: 1;
      background: #fff;
      padding-inline-start: 0px;
      width: 100%;
      font-size: 12px;
      li {
        padding: 5px 10px;
        list-style-type: none;
        .name {
        }
        .address {
          margin-left: 10px;
        }
        &:hover {
          background: #eee;
        }
      }
    }
    .dirlocSug {
      position: absolute;
      width: 100%;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
      background: #fff;
      z-index: 100;
      #locsug {
        display: block;
        color: #009cf9;
        font-size: 14px;
        height: 46px;
        line-height: 46px;
        margin-left: 14px;
        padding-left: 32px;
        background: #fff url("./assets/loc_ok.png") 0 no-repeat;
        text-decoration: none;
      }
    }
  }
}
</style>

<style lang="less">
.plan-wrap {
  .ant-radio-group {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
    .ant-radio-button-wrapper {
      flex: 1;
      border: initial;
      height: 28px;
      text-align: center;
      &:not(:first-child) {
        border-left: 1px solid #e2e2e2;
      }
    }

    .ant-radio-button-wrapper-checked {
      box-shadow: initial;
      &:focus-within {
        outline: initial;
      }
    }
  }
}
</style>
