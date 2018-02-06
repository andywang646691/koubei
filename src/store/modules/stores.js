import * as types from '@/store/mutation-types'

// initial state
const state = {
  shops: []
}

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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
