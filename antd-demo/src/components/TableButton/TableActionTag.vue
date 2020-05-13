<template>
  <a-tag :color="color" style="margin:1px;" @click="tagClick">
    <span v-if="iconfont" :class="`iconfont ${icon}`" />
    <a-icon v-else :type="icon" />
    {{ title }}
  </a-tag>
</template>
<script>
import { Icon } from 'ant-design-vue'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
})
export default {
  name: 'TableActionTag',
  props: {
    title: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconfont: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  components: {
    IconFont
  },
  methods: {
    tagClick (e) {
      this.$emit('onTagClick')
    }
  }
}
</script>
