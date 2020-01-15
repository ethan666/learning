<template>
  <div>
    <!-- <button @click="onClick">显示讯息</button> -->
    <input @input="onInput" />
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "DebounceTest",
  methods: {
    onInput: _.debounce(event => {
      console.log("input:" + event.target.value);
    }, 500)
  }
};
</script>
