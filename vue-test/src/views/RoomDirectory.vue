<template>
  <div class="room-directory">
    <p>房间列表</p>
    <!-- <ul>
      <li v-for="(item, index) in list" :key="index+1">
        {{item}}
      </li>
    </ul> -->
    <div id="nav">
      <div v-for="(item, index) in list" :key="index+1">
        <router-link :to="'/'+item">{{item+" "}}</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import Com
export default {
  name: 'roomDirectory',
  data: function () {
    return {
      list:[100,101,102,103,104,105,106,107,108,109,110]
    }
  }
}
</script>
