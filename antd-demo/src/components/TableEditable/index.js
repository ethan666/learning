import T from 'ant-design-vue/es/table/Table'

export default {
  data () {
    return {
    }
  },
  props: Object.assign({
    columnsAll: {
      type: Array,
      default: () => []
    }
  }, T.props),
  watch: {

  },
  created () {

  },
  methods: {

  },

  render () {
    const props = {}
    const tKeys = Object.keys(T.props)
    Object.keys(this.$props).forEach(key => {
      if (tKeys.indexOf(key !== -1)) {
        props[key] = this.$props[key]
      }
    })
    const table = (
      <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} >
        { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
      </a-table>
    )

    const editColumn = (
      <a-popover {...{ props: { title: '编辑列', trigger: 'click' } }}>
        <template slot={'content'}>
          <draggable v-model="columnsAll" group="column" @start="drag=true" @end="drag=false">
            <div v-for="element in columnsAll" :key="element.dataIndex">
              <a-checkbox :defaultChecked="element.checked" @change="onChange(element, $event)">{{ element.title }}</a-checkbox>
            </div>
          </draggable>
        </template>
        <a-button {...{ props: { class: 'column-select', type: 'primary', icon: 'menu-fold' } }}></a-button>
      </a-popover>
    )

    return (
      <div class="table-editable">

        { editColumn }
        { table }
      </div>
    )
  }
}
