import * as types from '@/store/mutation-types'

// initial state
const state = {
  useTimeArr: []
}

// getters
const getters = {}
// actions
const actions = {
  updateUseTime ({ commit }, useTime) {
    commit(types.UPDATE_USE_TIME, { useTime })
  },
  deleteUseTime ({ commit }, id) {
    commit(types.DELETE_USE_TIME, { id })
  }
}

// mutations
const mutations = {
  [types.UPDATE_USE_TIME] (state, { useTime }) {
    state.useTimeArr.push(useTime)
  },
  [types.DELETE_USE_TIME] (state, { id }) {
    state.useTimeArr.splice(id, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
