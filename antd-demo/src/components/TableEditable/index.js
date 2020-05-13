import Vue from 'vue'
import T from 'ant-design-vue/es/table/Table'
// import draggable from 'vuedraggable/src/vuedraggable'
import draggable from 'vuedraggable'
import VueDraggableResizable from 'vue-draggable-resizable'

export default {
  name: 'TableEditable',
  data () {
    return {
    }
  },
  props: T.props,
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
    const props = {}
    const tKeys = Object.keys(T.props)
    Object.keys(this.$props).forEach(key => {
      if (tKeys.indexOf(key !== -1)) {
        props[key] = this.$props[key]
      }
    })

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
        <a-button {...{ props: { class: 'column-select', type: 'primary', icon: 'menu-fold' } }}></a-button>
      </a-popover>
    )

    const _columns = this.columns.filter(item => item.checked)
    props.columns = _columns

    const draggingMap = {}
    _columns.forEach(col => {
      draggingMap[col.key] = col.width
    })
    const draggingState = Vue.observable(draggingMap)
    const ResizeableTitle = (h1) => {
      const { props, children } = h1
      let thDom = null
      const { key, ...restProps } = props
      const col = _columns.find(col => {
        const k = col.dataIndex || col.key
        return k === key
      })
      if (!col.width) {
        return <th {...restProps}>{children}</th>
      }
      const onDrag = (x, y) => {
        draggingState[key] = 0
        col.width = Math.max(x, 1)
      }

      const onDragstop = () => {
        draggingState[key] = thDom.getBoundingClientRect().width
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
            x={draggingState[key] || col.width}
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
