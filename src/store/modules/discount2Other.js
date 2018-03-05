import * as types from '@/store/mutation-types'
import useInstructionsStore from './useInstructions'
import useTimeStore from './useTime'

// initial state
let useTime = useTimeStore.state.useTimeArr.slice(0)
let useInstructions = useInstructionsStore.state.useInstructions.slice(0)
function initState () {
  return {
    other: {
      autoDelayFlag: 'N',
      distriAmount: '',
      useway: 'DIRECT_SEND',
      effectTime: 'IMMEDIATELY',
      payChannelLimit: 'USE_NO_LIMIT',
      donateFlag: 'false',
      userWinCount: '',
      userWinFrequency: '',
      useTime,
      useInstructions
    }
  }
}
const state = initState()

// getters
const getters = {}
// actions
const actions = {
  setDiscount2Other ({ commit }, data) {
    commit(types.SET_DISCOUNT2_OTHER, { data })
  }
}

// mutations
const mutations = {
  [types.SET_DISCOUNT2_OTHER] (state, { data }) {
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
