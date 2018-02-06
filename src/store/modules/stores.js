import * as types from '@/store/mutation-types'

// initial state
function initState () {
  return {
    shops: []
  }
}
const state = initState()

// getters
const getters = {}
// actions
const actions = {
  setShops ({ commit }, shops) {
    commit(types.SET_SHOPS, { shops })
  }
}

// mutations
const mutations = {
  [types.SET_SHOPS] (state, { shops }) {
    state.shops = shops
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
