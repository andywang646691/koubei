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
      hightestLimit: '',
      donateFlag: '0',
      userWinCount: '0',
      userWinFrequency: '0',
      useInstructions: ''
    }
  }
}
const state = initState()

// getters
const getters = {}
// actions
const actions = {
  setDiscount1Other ({ commit }, data) {
    commit(types.SET_DISCOUNT1_OTHER, { data })
  }
}

// mutations
const mutations = {
  [types.SET_DISCOUNT1_OTHER] (state, { data }) {
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
