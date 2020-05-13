import IconTest from '@/views/IconTest.vue'
import PromiseTest from '@/views/js/PromiseTest.vue'
import DebounceTest from '@/views/lodash/DebounceTest.vue'
import DebounceTest2 from '@/views/lodash/DebounceTest2.vue'
import TableResize from '@/views/table/Resize.vue'
import AsyncRouter from '@/views/AsyncRouter.vue'

export const asyncRouterMap = [
  { path: '/promise', component: PromiseTest }
]

export const constantRouterMap = [
  { path: '/', redirect: '/icon' },
  { path: '/icon', component: IconTest },
  { path: '/asyncRouter', component: AsyncRouter },
  { path: '/table/resize', component: TableResize },
  { path: '/lodash/debounce1', component: DebounceTest },
  { path: '/lodash/debounce2', component: DebounceTest2 },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]
