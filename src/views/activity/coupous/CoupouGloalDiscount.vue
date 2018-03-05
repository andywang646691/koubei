<template lang="pug">
div
  router-view.nested-view(v-show="nestedView")
  .coupou-globalDiscount.fill-view.bg-gray(v-show="!nestedView")
    .cell-wrapper
      form-cell(
      title="折扣力度"
      unit="折"
      maxlength="3"
      v-model="discount"
      )
      mt-cell(
      is-link
      title="领取生效"
      v-bind:value="effectTime | dictFormat"
      v-on:click.native="sheetShwon1 = true"
      )
      mt-cell(
      is-link
      title="可以转赠"
      v-bind:value="donateFlag | boolTransform"
      v-on:click.native="sheetShwon2 = true"
      )
    .cell-wrapper
      mt-cell(
      is-link
      title="支付渠道限制"
      v-bind:value="payChannelLimit | dictFormat"
      v-on:click.native="sheetShwon3 = true"
      )
      mt-cell(
      is-link
      title="使用时段"
      value="设置"
      v-on:click.native="$router.push({name: 'coupou-globalDiscount.useTime'})"
      )
      form-cell(
      title="最低消费"
      v-model="lowestLimit"
      type="tel"
      placeholder="不填无限制"
      )
      form-cell(
      title="最高优惠"
      type="tel"
      v-model="hightestLimit"
      placeholder="不填无限制"
      )
    .cell-wrapper
      mt-cell(
      is-link
      title="使用说明"
      value="设置"
      v-on:click.native="$router.push({name: 'coupou-globalDiscount.useInstructions'})"
      )
      form-cell(
      title="发券数量"
      type="tel"
      v-model="sendNum"
      placeholder="默认为1"
      )
    .btn-list
      button.btn.btn-reverse.btn-other(v-on:click="confirm")
        span  确定
      button.btn.btn-red.btn-other(v-on:click="deleteItem")
        span  删除
    mt-actionsheet(
    :actions="effectTimeOptions"
    v-model="sheetShwon1"
    )
    mt-actionsheet(
    :actions="donateFlagOptions"
    v-model="sheetShwon2"
    )
    mt-actionsheet(
    :actions="payChannelLimitOptions"
    v-model="sheetShwon3"
    )
</template>

<script>
import FormCell from '@/components/FormCell.vue'
import { mapActions, mapState } from 'vuex'
import { MessageBox, Toast } from 'mint-ui'
export default {
  name: 'coupou-globalDiscount',
  data () {
    return {
      sendNum: '1',
      discount: '8.5',
      payChannelLimit: 'USE_NO_LIMIT',
      payChannelLimitOptions: [
        {name: '不限制', method: () => { this.payChannelLimit = 'USE_NO_LIMIT' }},
        {name: '仅限储值卡付款可享', method: () => { this.payChannelLimit = 'USE_ON_CURRENT_PAY_CHANNEL' }},
        {name: '储值卡付款时不可享', method: () => { this.payChannelLimit = 'NOT_ALLOWED_USE' }}
      ],
      effectTime: 'IMMEDIATELY',
      effectTimeOptions: [
        {name: '领取后立即生效', method: () => { this.effectTime = 'IMMEDIATELY' }}
      ],
      donateFlag: 'false',
      donateFlagOptions: [
        {name: '是', method: () => { this.donateFlag = 'true' }},
        {name: '否', method: () => { this.donateFlag = 'false' }}
      ],
      lowestLimit: '',
      hightestLimit: '',
      sheetShwon1: false,
      sheetShwon2: false,
      sheetShwon3: false
    }
  },
  computed: {
    ...mapState('useTime', {
      'useTime': state => state.useTimeArr
    }),
    ...mapState('useInstructions', [
      'useInstructions'
    ]),
    nestedView () {
      return this.$route.name !== 'coupou-globalDiscount'
    }
  },
  components: {
    FormCell
  },
  methods: {
    ...mapActions('awards', [
      'setPromoToolsItem',
      'deletePromoToolsItem'
    ]),
    deleteItem () {
      MessageBox.confirm('确认要删除这种券吗？').then(action => {
        this.deletePromoToolsItem({index: this.$route.params.index})
        this.$router.push({name: 'activity2'})
      })
    },
    confirm () {
      let voucherItem = {
        discount: this.discount,
        effectTime: this.effectTime,
        payChannelLimit: this.payChannelLimit,
        hightestLimit: this.hightestLimit,
        lowestLimit: this.lowestLimit,
        donateFlag: this.donateFlag,
        sendNum: this.sendNum,
        useTime: this.useTime,
        useInstructions: this.useInstructions
      }
      if (voucherItem.sendNum > 5) return Toast('发券数量最多为5张')
      let voucherObj = JSON.parse(JSON.stringify({
        voucher: {
          rate: (+this.discount * 0.1).toFixed(2),
          type: 'RATE',
          delayInfo: {type: 'BYDAY', value: '1440'},
          effectType: this.effectTime,
          maxAmount: this.hightestLimit,
          donateFlag: this.donateFlag,
          useInstructions: this.useInstructions,
          useRule: {
            limitRule: this.payChannelLimit,
            minConsume: this.lowestLimit,
            useTime: this.useTime
          }
        },
        sendRule: {
          minCost: this.lowestLimit,
          sendNum: this.sendNum
        }
      }))
      this.setPromoToolsItem({item: { name: 'coupou-globalDiscount', voucherObj }, index: this.$route.params.index, voucherItem})
      this.$router.push({name: 'activity2'})
    }
  },
  created () {
    let index = this.$route.params.index
    let data = JSON.parse(JSON.stringify(this.$store.state.awards.voucherArr[index] || {}))
    if (data.useTime) {
      this.$store.commit('useTime/UPDATE_RESULT_USE_TIME', { useTimeArr: data.useTime })
    } else {
      this.$store.commit('useTime/RESET_ALL_STATE')
    }
    if (data.useInstructions) {
      this.$store.commit('useInstructions/UPDATE_USE_INSTRUCTIONS', { useInstructions: data.useInstructions })
    } else {
      this.$store.commit('useInstructions/RESET_ALL_STATE')
    }
    delete data.useTime
    delete data.useInstructions
    Object.assign(this.$data, data)
  }
}
</script>

<style lang="scss" scoped>
</style>
