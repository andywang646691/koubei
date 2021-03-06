import * as types from '@/store/mutation-types'

// initial state
function initState () {
  return {
    other: {
      autoDelayFlag: 'N',
      distriAmount: '',
      useway: 'DIRECT_SEND',
      effectTime: 'IMMEDIATELY',
      payChannelLimit: 'USE_NO_LIMIT',
      useTime: null,
      lowestLimit: '',
      donateFlag: '0',
      userWinCount: '',
      userWinFrequency: '',
      useInstructions: ''
    }
  }
}
const state = initState()

// getters
const getters = {}
// actions
const actions = {
  setDiscount3Other ({ commit }, data) {
    commit(types.SET_DISCOUNT3_OTHER, { data })
  }
}

// mutations
const mutations = {
  [types.SET_DISCOUNT3_OTHER] (state, { data }) {
    state.other = data
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
