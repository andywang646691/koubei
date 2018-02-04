import Vue from 'vue'
import Vuex from 'vuex'
import coupouExpired from './modules/coupouExpired'
import useTimeItem from './modules/useTimeItem'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    coupouExpired,
    useTimeItem
  }
})
