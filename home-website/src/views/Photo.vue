<template>
  <div class="container">
    {{ title }}
    <a-image
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      :width="200"
    />
    <!-- <a-button type="primary">nihoa</a-button> -->
  </div>
</template>

<script>
export default {
  name: "Ph oto",
  data() {
    return {
      title: "家庭相册",
    };
  },
};
</script>
