<template>
  <div class="container">
    {{ title }}
    <a-image
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      :width="200"
    />
    <!-- <a-button type='primary'>nihoa</a-button> -->
  </div>
</template>

<script>
// import Vue from 'vue';
// import { Image } from 'ant-design-vue';

// Vue.use(Image);

export default {
  name: "Photo",
  data() {
    return {
      title: "家庭相册",
    };
  },
};
</script>
