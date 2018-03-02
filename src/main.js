// polyfill
import 'core-js/fn/array/includes'

import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import { intercept } from '@/services/intercept'
import { Cell, DatetimePicker, Field, Actionsheet, Radio, Checklist, CellSwipe } from 'mint-ui'
import { formatCrowdType, boolTransform, dictFormat } from '@/services/filters.js'
import store from '@/store/index'
import { checkAuth } from '@/services/helpers'
import { redirectToAppAuth, redirectToPublicAppAuth } from '@/apis/redirect'
import { getQueryString } from './services/util'
import { onlyNumAndDot } from '@/services/directives/onlyNum'
if (process.env.NODE_env !== 'production') {
  let script = document.createElement('script')
  script.src = 'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js'
  script.onload = function () {
    /* eslint-disable no-new */
    if (window.VConsole) new window.VConsole()
  }
  document.head.appendChild(script)
}
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

Vue.directive('num', { bind: onlyNumAndDot })

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false
Vue.prototype.$log = console.log

let authCode = getQueryString(location.href, 'auth_code')
if (authCode) {
  checkAuth(authCode).then(alpUserInfo => {
    /* eslint-disable no-new */
    intercept(alpUserInfo)
    let vue = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
    vue.$store.state.alpUserInfo = alpUserInfo
  }).catch(() => {
    location.href = redirectToAppAuth
  })
} else {
  location.href = redirectToPublicAppAuth
}
