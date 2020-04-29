import Vue from 'vue'
import Router from 'vue-router'
import IconTest from './views/IconTest.vue'
import PromiseTest from './views/js/PromiseTest.vue'
import DebounceTest from './views/lodash/DebounceTest.vue'
import DebounceTest2 from './views/lodash/DebounceTest2.vue'
import TableResize from './views/table/Resize.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/icon' },
    { path: '/icon', component: IconTest },
    { path: '/table/resize', component: TableResize },
    { path: '/promise', component: PromiseTest },
    { path: '/lodash/debounce1', component: DebounceTest },
    { path: '/lodash/debounce2', component: DebounceTest2 }
  ]
})
