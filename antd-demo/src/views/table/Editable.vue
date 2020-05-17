<template>
  <div class="editable">
    <table-editable
      size="small"
      bordered
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      @change="onTableChange"
    >
      <span
        slot="amount"
        slot-scope="text"
      >
        <a href="javascript:;">{{ text }}</a>
      </span>
      <template v-slot:action>
        <a href="javascript:;">Delete</a>
      </template>
    </table-editable>
  </div>
</template>

<script>
import { TableEditable } from '@/components'

const columns = [
  {
    checked: true,
    title: 'Date',
    dataIndex: 'date',
    width: 200
  },
  {
    checked: true,
    title: 'Amount',
    dataIndex: 'amount',
    width: 200,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
    scopedSlots: { customRender: 'amount' }
  },
  {
    checked: true,
    title: 'Type',
    dataIndex: 'type',
    width: 100,
    filters: [
      {
        text: 'income',
        value: 'income'
      },
      {
        text: 'outcome',
        value: 'outcome'
      }
    ],
    onFilter: (value, record) => record.type === value
  },
  {
    checked: false,
    title: 'Note',
    dataIndex: 'note',
    width: 100
  },
  {
    checked: true,
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
const data = [
  {
    key: 0,
    date: '2018-02-11',
    amount: 120,
    type: 'income',
    note: 'transfer'
  },
  {
    key: 1,
    date: '2018-03-11',
    amount: 243,
    type: 'income',
    note: 'transfer'
  },
  {
    key: 2,
    date: '2018-04-11',
    amount: 98,
    type: 'outcome',
    note: 'transfer'
  }
]

export default {
  name: 'Editable',
  components: {
    TableEditable
  },
  mounted () {
    this.pagination.total = 3
  },
  data () {
    return {
      data,
      columns,
      pagination: {
        showQuickJumper: true,
        // showSizeChanger: true,
        // pageSizeOptions: ['10', '20', '50', '100'],
        current: 1,
        pageSize: 2,
        total: 0,
        showTotal: total => `共 ${total} 条`
      }
    }
  },
  methods: {
    onTableChange (pagination, filters, sorter) {
      this.pagination = pagination
    }
  }
}
</script>
