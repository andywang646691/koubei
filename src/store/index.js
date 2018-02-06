import Vue from 'vue'
import Vuex from 'vuex'
import coupouExpired from './modules/coupouExpired'
import useTimeItem from './modules/useTimeItem'
import useTime from './modules/useTime'
import useInstructions from './modules/useInstructions'
import stores from './modules/stores'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    coupouExpired,
    useTimeItem,
    useTime,
    useInstructions,
    stores
  }
})
