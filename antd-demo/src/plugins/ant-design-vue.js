import Vue from 'vue'
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

// Vue.use(Antd)

import { Pagination, Button, Icon, Checkbox, ConfigProvider, Divider, Table, Popover, Input, Form, Row } from 'ant-design-vue'

import antInputDirective from 'ant-design-vue/es/_util/antInputDirective'
Vue.use(antInputDirective)
Vue.component(ConfigProvider.name, ConfigProvider)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.component(Icon.name, Icon)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Divider.name, Divider)
Vue.component(Table.name, Table)
Vue.component(Popover.name, Popover)
Vue.component(Input.name, Input)
Vue.component(Form.name, Form)
Vue.component(Row.name, Row)
