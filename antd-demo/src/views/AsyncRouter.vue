<template>
  <div class="async-router">
    <router-link to="/promise">
      promise test
    </router-link>
    <a-button
      type="primary"
      @click="onClick"
    >
      添加路由
    </a-button>
  </div>
</template>

<script>
import router from '../router'
import { asyncRouterMap } from '@/config/router.config'

export default {
  name: 'AsyncRouter',
  methods: {
    onClick () {
      router.addRoutes(asyncRouterMap)
    }
  }
}
</script>
