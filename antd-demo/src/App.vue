<!--
 * @Descripttion: 文件描述
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2020-01-11 14:13:57
 * @LastEditors: 谭义洋
 * @LastEditTime: 2021-12-29 18:53:31
-->
<template>
  <a-config-provider :locale="locale">
    <a-menu
      class="menu"
      :default-selected-keys="['1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="false"
    >
      <a-menu-item key="1">
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <span>Option 2</span>
      </a-menu-item>
    </a-menu>
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import Vue from 'vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { ConfigProvider, Menu } from 'ant-design-vue'

Vue.use(Menu)

export default {
  name: 'App',
  components: {
    'a-config-provider': ConfigProvider
  },
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
}
.menu{
  width: 100px;
}
</style>
