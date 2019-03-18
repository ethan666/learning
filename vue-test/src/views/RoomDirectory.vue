<template>
  <div class="room-directory">
    <p>房间列表</p>
    <div id="nav">
      <router-link v-for="(item, index) in list" :key="index+1" :to="'/'+item">
        <div>
          {{item+" "}}
        </div>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'roomDirectory',
  data: function () {
    return {
      list:[100,101,102,103,104,105,106,107,108,109,110]
    }
  }
}
</script>
