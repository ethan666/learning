<template>
  <div id="app" style="margin: 24px">
    <div>
      <p style="margin-bottom: 24px">
        Current ant-design-vue version: {{ version }}
        <br>You can change ant-design-vue version on the left panel (Dependencies
        section).
      </p>
    </div>
    <a-divider/>
    <!-- code -->
    <a-table bordered :columns="columns" :components="components" :dataSource="data">
      <template v-slot:action>
        <a href="javascript:;">Delete</a>
      </template>
    </a-table>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { version } from "ant-design-vue";
import VueDraggableResizable from "vue-draggable-resizable";

Vue.component("vue-draggable-resizable", VueDraggableResizable);

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    width: 200
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: 200,
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount
  },
  {
    title: "Type",
    dataIndex: "type",
    width: 100,
    filters: [
      {
        text: "income",
        value: "income"
      },
      {
        text: "outcome",
        value: "outcome"
      }
    ],
    onFilter: (value, record) => record.type === value,
  },
  {
    title: "Note",
    dataIndex: "note",
    width: 100
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
const data = [
  {
    key: 0,
    date: "2018-02-11",
    amount: 120,
    type: "income",
    note: "transfer"
  },
  {
    key: 1,
    date: "2018-03-11",
    amount: 243,
    type: "income",
    note: "transfer"
  },
  {
    key: 2,
    date: "2018-04-11",
    amount: 98,
    type: "outcome",
    note: "transfer"
  }
];
const draggingMap = {};
columns.forEach(col => {
  draggingMap[col.key] = col.width;
});
const draggingState = Vue.observable(draggingMap);
const ResizeableTitle = (h1) => {
  const {props, children} = h1
  let thDom = null;
  const { key, ...restProps } = props;
  const col = columns.find(col => {
    const k = col.dataIndex || col.key;
    return k === key;
  });
  if (!col.width) {
    return <th {...restProps}>{children}</th>;
  }
  const onDrag = (x, y) => {
    draggingState[key] = 0;
    col.width = Math.max(x, 1);
  };

  const onDragstop = () => {
    draggingState[key] = thDom.getBoundingClientRect().width;
  };
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
  );
};

export default {
  name: "Resize",
  data() {
    this.components = {
      header: {
        cell: ResizeableTitle
      }
    };
    return {
      moment,
      version,
      console: console,
      data,
      columns
    };
  },
  methods: {}
};
</script>

<style lang="less">
.resize-table-th {
  position: relative;
  .table-draggable-handle {
    height: 100% !important;
    bottom: 0;
    left: auto !important;
    right: -5px;
    cursor: col-resize;
    touch-action: none;
  }
}
</style>
