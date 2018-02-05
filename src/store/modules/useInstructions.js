import * as types from '@/store/mutation-types'

// initial state
const state = {
  useInstructions: [
    '本券在设定有效期内可用，凭本券在指定门店，使用支付宝当面付款时，即可享受本券优惠。',
    '本券仅限在有此产品供应的指定门店使用，具体情况以餐厅公示为准。',
    '本券仅限堂食使用，不适用于外带外送；不适用于礼品卡及线上产品券消费支付。且本券不可与其他优惠共享。',
    '本活动仅支持使用9.5及以上版本支付宝手机客户端的支付宝实名个人用户参与，且需开启支付宝余额支付功能，活动时间均以付款结算时间为准。',
    '活动期间同一用户可参加次数以活动设定为准，同一支付宝账号、同一手机终端、同一手机号或同一身份证，符合以上任一条件的，均视为同一用户。',
    '若发生全额退款，将仅退还用户实际支付的金额；券优惠金额不退回，优惠不再补偿。'
  ]
}

// getters
const getters = {}
// actions
const actions = {
  updateUseInstructions ({ commit }, useInstructions) {
    commit(types.UPDATE_USE_INSTRUCTIONS, { useInstructions })
  }
}

// mutations
const mutations = {
  [types.UPDATE_USE_INSTRUCTIONS] (state, { useInstructions }) {
    state.useInstructions = useInstructions
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
