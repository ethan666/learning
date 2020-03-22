import Vue from 'vue'
import { Pagination, Button, Icon, ConfigProvider } from 'ant-design-vue'

import antInputDirective from 'ant-design-vue/es/_util/antInputDirective'
Vue.use(antInputDirective)
Vue.component(ConfigProvider.name, ConfigProvider)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.component(Icon.name, Icon)
