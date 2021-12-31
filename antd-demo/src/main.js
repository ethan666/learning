/*
 * @Descripttion: 文件描述
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2020-01-11 14:13:57
 * @LastEditors: 谭义洋
 * @LastEditTime: 2021-12-29 18:55:36
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/ant-design-vue.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
