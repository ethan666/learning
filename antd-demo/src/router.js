import Vue from "vue";
import Router from "vue-router";
import IconTest from "./views/IconTest.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{ path: "/icon", component: IconTest }]
});
