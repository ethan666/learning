import IconTest from '@/views/IconTest.vue'
import PromiseTest from '@/views/js/PromiseTest.vue'
import DebounceTest from '@/views/lodash/DebounceTest.vue'
import DebounceTest2 from '@/views/lodash/DebounceTest2.vue'
import TableResize from '@/views/table/Resize.vue'
import Editable from '@/views/table/Editable.vue'
import AsyncRouter from '@/views/AsyncRouter.vue'

export const asyncRouterMap = [
  { path: '/promise', component: PromiseTest }
]

const isProd = process.env.NODE_ENV === 'production'
console.log(`isProd: ${isProd}`)

export const constantRouterMap = [
  { path: '/', redirect: '/table/editable' },
  { path: '/icon', component: isProd ? () => import(/* webpackChunkName: "icon" */ '@/views/IconTest') : IconTest },
  { path: '/asyncRouter', component: isProd ? () => import(/* webpackChunkName: "router" */ '@/views/AsyncRouter') : AsyncRouter },
  { path: '/table/resize', component: isProd ? () => import(/* webpackChunkName: "table" */ '@/views/table/Resize') : TableResize },
  { path: '/table/editable', component: isProd ? () => import(/* webpackChunkName: "table" */ '@/views/table/Editable') : Editable },
  { path: '/lodash/debounce1', component: isProd ? () => import(/* webpackChunkName: "lodash" */ '@/views/lodash/DebounceTest') : DebounceTest },
  { path: '/lodash/debounce2', component: isProd ? () => import(/* webpackChunkName: "lodash" */ '@/views/lodash/DebounceTest2') : DebounceTest2 },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]
