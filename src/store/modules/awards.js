import * as types from '@/store/mutation-types'

// initial state
function initState () {
  return {
    promoTools: [],
    voucherArr: []
  }
}
const state = initState()

// getters
const getters = {}
// actions
const actions = {
  setPromoToolsItem ({ commit }, { item, index, voucherItem }) {
    commit(types.SET_PROMOTOOLS_ITEM, { item, index })
    commit(types.SET_VOUCHER_ITEM, { voucherItem, index })
  },
  deletePromoToolsItem ({ commit }, { index }) {
    commit(types.DELETE_PROMOTOOLS_ITEM, { index })
    commit(types.DELETE_VOUCHER_ITEM, { index })
  }
}

// mutations
const mutations = {
  [types.SET_PROMOTOOLS_ITEM] (state, { item, index }) {
    if (index) {
      state.promoTools.splice(index, 1, item)
    } else {
      state.promoTools.push(item)
    }
  },
  [types.SET_VOUCHER_ITEM] (state, { voucherItem, index }) {
    if (index) {
      state.voucherArr.splice(index, 1, voucherItem)
    } else {
      state.voucherArr.push(voucherItem)
    }
  },
  [types.DELETE_PROMOTOOLS_ITEM] (state, { index }) {
    state.promoTools.splice(index, 1)
  },
  [types.DELETE_VOUCHER_ITEM] (state, { index }) {
    state.voucherArr.splice(index, 1)
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
