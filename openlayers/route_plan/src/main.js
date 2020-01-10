import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

var coordtransform = require("coordtransform");
console.log(coordtransform.gcj02towgs84(114.25917, 30.582336));
