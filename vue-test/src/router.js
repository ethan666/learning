import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Download from './views/Download.vue'
import RoomDirectory from './views/RoomDirectory.vue'
import Error from './views/Error.vue'
import DownloadWindow from './components/Download_window.vue'
import DownloadOs from './components/Download_os.vue'
import Room from './components/Room.vue'
import Users from './views/Users.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/download',
      redirect: '/download/window',
      name: 'download',
      component: Download,
      children: [
        {
          path: 'window',
          component: DownloadWindow
        },
        {
          path: 'os',
          component: DownloadOs
        }
      ]
    },
    {
      path: '/123',
      redirect: '/about'
    },
    {
      path: '/room',
      name: 'rooms',
      component: RoomDirectory,
      // children: [
      //   {
      //     path: ':id',
      //     component: Room
      //   }
      // ]
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/:id',
      name: 'room',
      component: Room,
    },
    {
      path: '/error',
      name: 'error',
      component: Error
    },
    {
      path: '/about/*',
      redirect: '/error'
    }
  ]
})
