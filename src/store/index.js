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
import * as types from '@/store/mutation-types'
Vue.use(Vuex)

const actions = {
  resetAllState ({ commit, state }) {
    let modulesName = Object.keys(state)
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
    activity1Other
  },
  actions
})
