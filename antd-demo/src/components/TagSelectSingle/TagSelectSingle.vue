<template>
  <div class="tag-select-single">
    <a-checkable-tag class="tag-item" v-for="item in checkedList" :key="item.value" v-model="item.checked" @change="onChange(item)">{{ item.title }}</a-checkable-tag>
  </div>
</template>

<script>
export default {
  name: 'TagSelectSingle',
  mounted () {
    this.updateCheckedList()
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      checkedList: []
    }
  },
  methods: {
    onChange (item) {
      if (!item.checked) {
        item.checked = true
      }
      this.checkedList.forEach(t => {
        if (t !== item) {
          t.checked = false
        }
      })
      this.$emit('change', item.value)
    },
    updateCheckedList () {
      this.checkedList = this.data.map(item => {
        const { value } = item
        const newItem = { ...item }
        newItem.checked = value === this.value
        return newItem
      })
    }
  },
  watch: {
    data: {
      handler: function () {
        this.updateCheckedList()
      },
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.tag-select-single{
  .tag-item{
    cursor: pointer;
  }
}
</style>
