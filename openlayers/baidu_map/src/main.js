import Vue from "vue";
import App from "./App.vue";
import VueJsonp from "vue-jsonp";
import BaiduMap from "vue-baidu-map";

Vue.use(VueJsonp);

Vue.use(BaiduMap, {
  ak: "0ec6jPcr5k4yloyilfZQchyvnMCuDyhR"
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
