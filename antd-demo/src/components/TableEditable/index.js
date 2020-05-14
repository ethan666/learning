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

  },

  render (h) {
    const editColumn = (
      <a-popover {...{ props: { title: '编辑列', trigger: 'click' } }}>
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
        <a-button class='column-select' {...{ props: { type: 'primary', icon: 'menu-fold' } }}></a-button>
      </a-popover>
    )

    const columns = this.columns.filter(item => item.checked)
    const props = { ...this.$props, columns }

    // const draggingMap = {}
    // columns.forEach(col => {
    //   draggingMap[col.key] = col.width
    // })
    // const draggingState = Vue.observable(draggingMap)
    const ResizeableTitle = (h1) => {
      const { props, children } = h1
      let thDom = null
      const { key, ...restProps } = props
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
      on: (this.$vnode ? this.$vnode.componentOptions.listeners : this.$listeners) || {}
    }
    return (
      <div class="table-editable">
        { editColumn }
        { h(T, tProps) }
      </div>
    )
  }
}
