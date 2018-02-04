import * as types from '@/store/mutation-types'

// initial state
const state = {
  useTimes: '',
  useTimeDay: []
}

// getters
const getters = {}
// actions
const actions = {
  setUseTimes ({ commit }, useTimes) {
    commit(types.SET_USE_TIMES, { useTimes })
  },
  SET_USE_TIME_DAY ({ commit }, useTimeDay) {
    commit(types.SET_USE_TIME_DAY, { useTimeDay })
  }
}

// mutations
const mutations = {
  [types.SET_USE_TIMES] (state, { useTimes }) {
    state.useTimes = useTimes
  },
  [types.SET_USE_TIME_DAY] (state, { useTimeDay }) {
    state.useTimeDay = useTimeDay
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
