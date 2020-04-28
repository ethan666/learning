<template>
  <div>
    <!-- <button @click="onClick">显示讯息</button> -->
    <input @input="onInput">
  </div>
</template>

<script>
import _ from 'lodash'
import { checkType } from '../../utils/util'

export default {
  name: 'DebounceTest',
  data () {
    return {
      pp: '3423ewr'
    }
  },
  methods: {
    onInput: _.debounce(function (event) {
      console.log(
        `input:${event.target.value},this:${checkType(this)},this.pp:${this.pp}`
      )
    }, 500)
  }
}
</script>
