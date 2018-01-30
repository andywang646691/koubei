import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import { Cell, DatetimePicker, Field, Actionsheet } from 'mint-ui'
import { formatCrowdType } from '@/services/filters.js'
import { onlyNumAndDot } from '@/services/directives/onlyNum.js'

Vue.component(Cell.name, Cell)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Field.name, Field)
Vue.component(Actionsheet.name, Actionsheet)

Vue.filter('formatCrowdType', formatCrowdType)

Vue.directive('onlyNumAndDot', onlyNumAndDot)

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
