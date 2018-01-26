import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import { Cell, DatetimePicker } from 'mint-ui'

Vue.component(Cell.name, Cell)
Vue.component(DatetimePicker.name, DatetimePicker)

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
