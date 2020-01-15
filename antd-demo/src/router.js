import Vue from "vue";
import Router from "vue-router";
import IconTest from "./views/IconTest.vue";
import DebounceTest from "./views/lodash/DebounceTest.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/icon", component: IconTest },
    { path: "/lodash", component: DebounceTest }
  ]
});
