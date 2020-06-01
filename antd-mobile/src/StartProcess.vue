<template>
  <div class="page-content start-process">
    <van-cell-group>
      <van-cell title="所属流程" :value="data.processDefine && data.processDefine.name || ''" />
      <van-cell title="发起时间" :value="data.created" />
      <van-cell title="发起人" :value="data.starter" />
      <van-cell title="说明" :value="data.description" />
    </van-cell-group>
    <van-form @submit="onSubmit">
      <van-field
        v-for="item in fields"
        :key="item.key"
        clearable
        v-model="this[item.key]"
        :name="item.key"
        :label="item.name"
        :rules="[{ required: item.required, message: `请填写${item.name}` }]"
      >
        <van-datetime-picker
          v-if="item.type === 'date'"
          v-model="currentDate"
          type="date"
          title="选择年月日"
        />
      </van-field>
      <div class="btn-box">
        <van-button type="info" block @click="onSubmit">立即办理</van-button>
      </div>
    </van-form>
    <!-- <es-form style="background:#fff;" ref="form" v-if="gotFields" :schema="formSchema" v-model="formValue"></es-form>
    <div class="btn-box">
      <van-button type="info" block :loading="loading" @click="onSubmit">立即办理</van-button>
    </div> -->
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        type="date"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Cell, CellGroup, Button, Form, Field, DatetimePicker, Popup } from 'vant'
import esForm from 'vue-easy-form'
import { formDataReq, finishTaskReq } from '@/api/tasks'

Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(DatetimePicker)
Vue.use(Popup)
Vue.use(esForm)

export default {
  name: 'StartProcess',
  mounted () {
    this.data = this.list.find(item => item.id === this.id) || {}

    const _this = this
    if (this.data.taskKey) {
      const { taskKey, processDefine: { key } } = this.data
      const params = { process_define_key: key, task_key: taskKey }
      formDataReq(params)
        .then(res => {
          if (res.code === 200) {
            const fields = res.data.fields
            fields.forEach(item => {
              // const { key, name, format, required, type, refs } = item
              const { key, name, required, type } = item
              let component
              let value
              const rules = {}
              if (type === 'string') {
                component = 'van-field'
                value = ''
                rules.required = required
                rules.emptyMsg = `${name}不允许为空!`
              } else if (type === 'date') {
                component = {
                  name: 'van-field',
                  props: {
                    // type: 'date'
                    readonly: true,
                    clickable: true,
                    value: 12
                  },
                  actions: { // 组件的行为，多个时可写数组
                    trigger: 'click',
                    handler: function () {
                      _this.showPicker = true
                    }
                  }
                }
                // value = new Date().toString()
                value = _this.time
                rules.required = required
                rules.emptyMsg = `${name}不允许为空!`
              } else if (type === 'long') {
                component = {
                  name: 'van-field',
                  props: {
                    type: 'number'
                  }
                }
                rules.required = required
                rules.emptyMsg = `${name}不允许为空!`
              } else if (type === 'boolean') {
                component = {
                  name: 'van-radio-group',
                  props: {
                    type: 'number',
                    options: [
                      {
                        text: '广东',
                        id: '广东id'
                      },
                      {
                        text: '北京',
                        id: '北京id'
                      }
                    ]
                  }
                }
                rules.required = required
                rules.emptyMsg = `${name}不允许为空!`
              } else if (type === 'enum') {
                component = 'van-field'
                rules.required = required
                rules.emptyMsg = `${name}不允许为空!`
              }
              this.formSchema.properties[key] = { label: name, component, value, rules }
            })
          }
          this.gotFields = true
        })
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      data: {},
      gotFields: false,
      showPicker: false,
      time: new Date().toString(),
      formValue: {},
      formSchema: {
        ui: { // 块（properties）的ui配置；非必填，不写会继承全局的配置；这些配置也会被下一级继承
          // 以下的配置会被properties里面的字段(name/baseInfo)继承，
          // name和baseInfo若没有覆盖，则继承
          rowHeight: 40,
          rowSpace: 10,
          labelWidth: 100,
          offsetLeft: 0,
          offsetRight: 0,
          colon: false,
          direction: 'h'
        },
        properties: {
          // name: {
          //   label: '名称',
          //   component: 'van-field',
          //   value: '天天'
          // }
        }
      },
      loading: false
    }
  },
  computed: {
    ...mapState('tasks', ['list'])
  },
  methods: {
    onSubmit () {
      const params = { taskId: this.data.id, formParams: this.formValue }
      this.loading = true
      finishTaskReq(params)
        .then(res => {
          this.loading = false
        })
    },
    onConfirm (time) {
      this.time = time
      this.showPicker = false
    }
  }
}
</script>

<style lang="less" scoped>
.start-process{
  .btn-box{
    margin: 16px;
  }
}
</style>
