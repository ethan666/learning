import T from 'ant-design-vue/es/table/Table'
// import draggable from 'vuedraggable/src/vuedraggable'
import draggable from 'vuedraggable'
import VueDraggableResizable from 'vue-draggable-resizable'
import './index.less'

export default {
  name: 'TableEditable',
  props: T.props,
  data () {
    return {
      visible: false
    }
  },
  computed: {
    draggingState () {
      const obj = {}
      this.columns.forEach(col => {
        obj[col.key] = col.width
      })
      return obj
    }
  },
  watch: {

  },
  created () {

  },
  components: {
    VueDraggableResizable
  },
  methods: {
    onVisibleChange (visible) {
      this.visible = visible
    }
  },

  render (h) {
    const { visible } = this
    const editColumn = (
      <a-popover {...{ props: { visible, title: '编辑列', trigger: 'click', placement: 'bottomRight' } }} onVisibleChange={this.onVisibleChange}>
        <template slot={'content'}>
          <draggable group={'column'} list={this.columns} >
            <transition-group>
              { Object.keys(this.columns).map(key => (
                <div key={key}>
                  <a-checkbox defaultChecked={this.columns[key].checked} onChange={event => { this.columns[key].checked = event.target.checked }}>{ this.columns[key].title }</a-checkbox>
                </div>
              )) }
            </transition-group>
          </draggable>
        </template>
        <a-button class='column-select' {...{ props: { type: 'primary', icon: visible ? 'menu-unfold' : 'menu-fold' } }}></a-button>
      </a-popover>
    )

    const columns = this.columns.filter(item => item.checked)
    const props = { ...this.$props, columns }

    const ResizeableTitle = (...arg) => {
      const h1 = arg[0]
      const { children, data } = h1
      let thDom = null
      const { key, ...restProps } = data
      const col = this.columns.find(col => {
        const k = col.dataIndex || col.key
        return k === key
      })
      if (!col.width) {
        return <th {...restProps}>{children}</th>
      }
      const onDrag = (x, y) => {
        this.draggingState[key] = 0
        col.width = Math.max(x, 1)
      }

      const onDragstop = () => {
        this.draggingState[key] = thDom.getBoundingClientRect().width
      }
      return (
        <th
          {...restProps}
          v-ant-ref={r => (thDom = r)}
          width={col.width}
          class="resize-table-th"
        >
          {children}
          <vue-draggable-resizable
            key={col.key}
            class="table-draggable-handle"
            w={10}
            x={this.draggingState[key] || col.width}
            z={1}
            axis="x"
            draggable={true}
            resizable={false}
            onDragging={onDrag}
            onDragstop={onDragstop}
          />
        </th>
      )
    }

    props.components = {
      header: {
        cell: ResizeableTitle
      }
    }

    const tProps = {
      props,
      scopedSlots: { ...this.$scopedSlots },
      on: (this.$vnode ? this.$vnode.componentOptions.listeners : this.$listeners) || {}
    }

    return (
      <div class="table-editable">
        { editColumn }
        <a-table {...tProps} >
          { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
        </a-table>
      </div>
    )
  }
}
