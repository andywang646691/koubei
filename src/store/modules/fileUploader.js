import * as types from '@/store/mutation-types'

// initial state
function initState () {
  return {
    qiniuUrl: '',
    imgId: ''
  }
}
const state = initState()
// getters
const getters = {}

// actions
const actions = {
  setQiniuUrl ({ commit }, qiniuUrl) {
    commit(types.SET_QINIU_URL, { qiniuUrl })
  },
  setImgId ({ commit }, imgId) {
    commit(types.SET_IMG_ID, { imgId })
  }
}

// mutations
const mutations = {
  [types.SET_QINIU_URL] (state, { qiniuUrl }) {
    state.qiniuUrl = qiniuUrl
  },
  [types.SET_IMG_ID] (state, { imgId }) {
    state.imgId = imgId
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
