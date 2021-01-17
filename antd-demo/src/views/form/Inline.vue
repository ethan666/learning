<template>
  <div class="inline">
    <a-form
      layout="inline"
      :form="form"
    >
      <a-form-item
        class="form-item-t"
        label="姓名"
      >
        <a-input
          v-decorator="['name']"
        />
      </a-form-item>
      <a-form-item
        class="form-item-t"
        label="年龄"
      >
        <a-input
          v-decorator="['age']"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Form } from 'ant-design-vue'

const FormItem = Form.Item

export default {
  name: 'Inline',
  components: {
    'a-form-item': FormItem
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'login' })
    }
  },
  methods: {

  }
}
</script>

<style lang="less">
.form-item-t{
  width: 100%;
}
</style>
