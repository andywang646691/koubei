import Vue from 'vue'
import Vuex from 'vuex'
import coupouExpired from './modules/coupouExpired'
import useTimeItem from './modules/useTimeItem'
import useTime from './modules/useTime'
import useInstructions from './modules/useInstructions'
import stores from './modules/stores'
import fileUploader from './modules/fileUploader'
import discount1Other from './modules/discount1Other'
import discount2Other from './modules/discount2Other'
import discount3Other from './modules/discount3Other'
import discount4Other from './modules/discount4Other'
import activity1Other from './modules/activity1Other'
import awards from './modules/awards'
import * as types from '@/store/mutation-types'
Vue.use(Vuex)

function initState () {
  return {
    alpUserInfo: {}
  }
}
const state = initState()

const actions = {
  resetAllState ({ commit }) {
    let modulesName = ['coupouExpired', 'useTimeItem', 'useTime', 'useInstructions', 'stores', 'discount1Other', 'fileUploader', 'discount2Other', 'discount3Other', 'discount4Other', 'activity1Other', 'awards']
    modulesName.forEach(name => commit(`${name}/${types.RESET_ALL_STATE}`))
  }
}

export default new Vuex.Store({
  modules: {
    coupouExpired,
    useTimeItem,
    useTime,
    useInstructions,
    stores,
    discount1Other,
    fileUploader,
    discount2Other,
    discount3Other,
    discount4Other,
    activity1Other,
    awards
  },
  actions,
  state
})
