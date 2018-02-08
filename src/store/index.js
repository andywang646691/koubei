import Vue from 'vue'
import Vuex from 'vuex'
import coupouExpired from './modules/coupouExpired'
import useTimeItem from './modules/useTimeItem'
import useTime from './modules/useTime'
import useInstructions from './modules/useInstructions'
import stores from './modules/stores'
import discount1Other from './modules/discount1Other'
import fileUploader from './modules/fileUploader'
import discount2Other from './modules/discount2Other'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    coupouExpired,
    useTimeItem,
    useTime,
    useInstructions,
    stores,
    discount1Other,
    fileUploader,
    discount2Other
  }
})
