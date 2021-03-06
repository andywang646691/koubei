import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import { intercept } from '@/services/intercept'
import { Cell, DatetimePicker, Field, Actionsheet, Radio, Checklist, CellSwipe } from 'mint-ui'
import { formatCrowdType, boolTransform, dictFormat } from '@/services/filters.js'
import store from '@/store/index'
Vue.component(Cell.name, Cell)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Field.name, Field)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Radio.name, Radio)
Vue.component(CellSwipe.name, CellSwipe)
Vue.component(Checklist.name, Checklist)

Vue.filter('formatCrowdType', formatCrowdType)
Vue.filter('boolTransform', boolTransform)
Vue.filter('dictFormat', dictFormat)

intercept({})

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false
Vue.prototype.$log = console.log

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
