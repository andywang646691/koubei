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

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false
Vue.prototype.$log = console.log

let authCode = getQueryString(location.href, 'auth_code')
if (authCode) {
  /* eslint-disable no-new */
  let vue = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
  checkAuth(authCode).then(alpUserInfo => {
    intercept(alpUserInfo)
    vue.$store.state.alpUserInfo = alpUserInfo
  }).catch(() => {
    location.href = redirectToAppAuth
  })
} else {
  location.href = redirectToPublicAppAuth
}
