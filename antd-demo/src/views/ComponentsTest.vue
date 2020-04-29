<template>
  <div class="home">
    <table-editable
      size="small"
      :bordered="true"
      :columns="tableColumn"
      :data-source="tableData"
    >
      <template v-slot:action>
        <a href="javascript:;">Delete</a>
      </template>
    </table-editable>
  </div>
</template>

<script>
// @ is an alias to /src

import { TableEditable } from '@/components/'

export default {
  name: 'ComponentsTest',
  components: {
    TableEditable
  },
  data () {
    return {
      targetTime: new Date().getTime() + 3900000,
      tagCloudData: [],
      tableData: [
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
      ],
      tableColumn: [
        {
          title: 'Date',
          dataIndex: 'date'
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          width: 200,
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.amount - b.amount
        },
        {
          title: 'Type',
          dataIndex: 'type',
          width: 100
        },
        {
          title: 'Note',
          dataIndex: 'note',
          width: 100
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          align: 'center',
          width: 100,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  created () {
    this.getTagCloudData()
  },
  methods: {
  }
}
</script>

<style scoped>
  .home {
    width: 900px;
    margin: 0 auto;
    padding: 25px 0;
  }
  .home > .banner {
    text-align: center;
    padding: 25px 0;
    margin: 25px 0;
  }
</style>
