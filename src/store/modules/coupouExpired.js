import * as types from '@/store/mutation-types'

// initial state
const state = {
  expiredType: 'RELATIVE',
  coupouExpired: '',
  expiredStart: '',
  expiredEnd: ''
}
// getters
const getters = {
  coupouExpiredView: state => state.expiredType === 'RELATIVE' ? state.coupouExpired + '天' : `${state.expiredStart} - ${state.expiredEnd}`
}

// actions
const actions = {
  setExpiredType ({ commit }, expiredType) {
    commit(types.SET_EXPIRED_TYPE, { expiredType })
  },
  setExpiredStartAndEnd ({ commit }, { expiredStart, expiredEnd }) {
    commit(types.SET_EXPIRED_START, { expiredStart })
    commit(types.SET_EXPIRED_END, { expiredEnd })
  },
  setCoupouExpired ({ commit }, coupouExpired) {
    commit(types.SET_COUPOU_EXPIRED, { coupouExpired })
  }
}

// mutations
const mutations = {
  [types.SET_EXPIRED_TYPE] (state, { expiredType }) {
    state.expiredType = expiredType
  },
  [types.SET_EXPIRED_START] (state, { expiredStart }) {
    state.expiredStart = expiredStart
  },
  [types.SET_EXPIRED_END] (state, { expiredEnd }) {
    state.expiredEnd = expiredEnd
  },
  [types.SET_COUPOU_EXPIRED] (state, { coupouExpired }) {
    state.coupouExpired = coupouExpired
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
