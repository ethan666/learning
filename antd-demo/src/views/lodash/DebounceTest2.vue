<template>
  <div>
    <input @input="onInputa">
  </div>
</template>

<script>
import { checkType } from '../../utils/util'
import { debounce, throttle } from '@/utils/lodash'

export default {
  name: 'DebounceTest2',
  data () {
    return {
      pp: '3423ewr'
    }
  },
  methods: {
    onInputa: debounce(function (event) {
      console.log(
        `this:${checkType(this)},this.pp:${this.pp},Results for "${
          event.target.value
        }"`
      )
    }, 500),
    onInput: throttle(function (event) {
      console.log(
        `this:${checkType(this)},this.pp:${this.pp},Results for "${
          event.target.value
        }"`
      )
    }, 500)
  }
}
</script>
