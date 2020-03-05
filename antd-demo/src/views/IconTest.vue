<template>
  <div>
    <a-icon
      :style="iconStyle"
      type="loading"
    />
    <icon-font
      class="iconfont"
      type="location"
    />
    <icon-font
      class="iconfont"
      type="exchange"
    />
    <icon-font
      class="iconfont"
      type="facebook"
    />
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'

/**
 * 在iconfont.cn我的项目，Symbol下复制链接
 */
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1608607_dutb83wgz9s.js'
})

export default {
  name: 'IconTest',
  components: {
    IconFont
  },
  data () {
    return {
      iconStyle: {
        fontSize: '30px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 24px;
  color: lawngreen;
}
</style>
