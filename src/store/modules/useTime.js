import * as types from '@/store/mutation-types'
import store from '@/store/index'

// initial state
function initState () {
  return {
    useTimeArr: []
  }
}
const state = initState()

// getters
const getters = {}
// actions
const actions = {
  initUseTimeItem ({ commit }) {
    commit(types.INIT_USE_TIME_ITEM, { useTimeArr: state.useTimeArr })
  },
  updateResultUseTime ({ commit }) {
    let useTimeItem = store.state.useTimeItem
    commit(types.UPDATE_RESULT_USE_TIME, { useTimeArr: useTimeItem.useTimeArr })
  }
}

// mutations
const mutations = {
  [types.INIT_USE_TIME_ITEM] (state, { useTimeArr }) {
    let useTimeItem = store.state.useTimeItem
    useTimeItem.useTimeArr = useTimeArr.slice(0)
  },
  [types.UPDATE_RESULT_USE_TIME] (state, { useTimeArr }) {
    state.useTimeArr = useTimeArr.slice(0)
  },
  [types.RESET_ALL_STATE] (state) {
    Object.assign(state, initState())
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
