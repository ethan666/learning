<template>
  <div class="tree">
    <div class="parent tree-node" v-for="(node, index) in data" :key="index" :data-name="node.name">
      <div class="parent-content" @click="onSelect(node.id, false, $event)">
        <a-icon type="user"/>
        <span>{{ node.name }}</span>
        <a-icon v-if="primaryDelete === 'true'" class="btn" theme="filled" type="minus-circle" @click="onDelete(node.id, $event)" />
        <a-icon v-if="primaryEdit === 'true'" class="btn" theme="filled" type="edit" @click="onEdit(node, $event)"/>
      </div>
      <div
        class="item tree-node"
        :class="{active:item.id === selectedId}"
        v-for="(item, si) in node.children"
        :key="si"
        :data-name="item.name"
        @click="onSelect(item.id, true, $event)">
        <a-icon type="user"/>
        <span>{{ item.name }}</span>
        <a-icon v-if="nextOption !== 'false'" class="btn" theme="filled" type="minus-circle" @click="onDelete(item.id, $event)" />
        <a-icon v-if="nextOption !== 'false'" class="btn" theme="filled" type="edit" @click="onEdit(item, $event)"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeAction',
  mounted () {
    this.selectedId = this.defalutSelectedId
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    nextOption: String,
    // eslint-disable-next-line vue/require-default-prop
    primaryDelete: String,
    // eslint-disable-next-line vue/require-default-prop
    primaryEdit: String,
    data: {
      type: Array,
      default: () => []
    },
    defalutSelectedId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      selectedId: null
    }
  },
  methods: {
    onAdd (id, event) {
      event.stopPropagation()
      this.$emit('add', id)
    },
    onEdit (item, event) {
      event.stopPropagation()
      this.$emit('edit', item)
    },
    onEditPrimary (item, event) {
      event.stopPropagation()
      this.$emit('edit', item)
    },
    onDelete (id, event) {
      event.stopPropagation()
      this.$emit('delete', id)
    },
    onSelect (id, isLeaf, event) {
      this.selectedId = id
      this.$emit('select', id, isLeaf, event)
    }
  },
  watch: {
    defalutSelectedId: function (newV, oldV) {
      this.selectedId = newV
    }
  }
}
</script>

<style lang="less" scoped>
.tree{
  width:100%;
  .parent{
    margin-top: 10px;
    .parent-content{
      padding-bottom: 5px;
      border-bottom: 1px solid #e8e8e8;
    }
    .item{
      margin-left: 20px;
      padding: 5px 0;
      border-bottom: 1px solid #e8e8e8;
      cursor: pointer;
      &:hover{
        background-color: #e6f7ff;
      }
    }
    .active{
      background-color: #e6f7ff;
    }
  }
  .btn{
    cursor: pointer;
    color:#1890FF;
    float: right;
    margin-left: 8px;
    margin-top: 3px;
    transition: all 0.3s;
    // transform: translate(-50%, -50%);
    &:hover{
      transform: scale(1.5, 1.5);
    }
  }
}
</style>
