<template>
  <div>
    <input @input="onInput">
  </div>
</template>

<script>
import { checkType } from '../../utils/util'
import { debounce } from '@/utils/lodash'

export default {
  name: 'DebounceTest2',
  data () {
    return {
      pp: '3423ewr'
    }
  },
  methods: {
    onInput: debounce(function (event) {
      console.log(
        `this:${checkType(this)},this.pp:${this.pp},Results for "${
          event.target.value
        }"`
      )
    }, 500)
  }
}
</script>
