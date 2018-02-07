import * as types from '@/store/mutation-types'
import { format } from 'date-fns'

// initial state
function initState () {
  return {
    expiredType: 'RELATIVE',
    coupouExpired: '',
    expiredStart: format(new Date(), 'YYYY-MM-DD'),
    expiredEnd: format(new Date(), 'YYYY-MM-DD')
  }
}
const state = initState()
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
