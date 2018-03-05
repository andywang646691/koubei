<template lang="pug">
  div
    router-view.nested-view(v-show="nestedView")
    .discount4-other.fill-view.bg-gray(v-show="!nestedView")
      .cell-wrapper.top-item
        mt-cell(
        is-link
        title="自动续期"
        v-bind:value="autoDelayFlag | boolTransform"
        v-on:click.native="sheetShwon1 = true"
        )
        form-cell(
        title="发放总量"
        unit="张"
        type="tel"
        placeholder="不填无限制"
        v-model="distriAmount"
        )
        mt-cell(
        is-link
        title="使用方式"
        v-bind:value="useway | dictFormat"
        v-on:click.native="sheetShwon2 = true"
        )
        mt-cell(
        is-link
        title="领取生效"
        v-bind:value="effectTime | dictFormat"
        v-on:click.native="sheetShwon3 = true"
        )
      .cell-wrapper
        mt-cell(
        is-link
        title="支付渠道限制"
        v-bind:value="payChannelLimit | dictFormat"
        v-on:click.native="sheetShwon4 = true"
        )
        mt-cell(
        is-link
        title="使用时段"
        value="设置"
        v-on:click.native="$router.push({name: 'discount4.useTime'})"
        )
        mt-cell(
        is-link
        title="可以转赠"
        v-bind:value="donateFlag | boolTransform"
        v-on:click.native="sheetShwon5 = true"
        )
        form-cell(
        title="每个用户总共参与次数"
        v-model="userWinCount"
        placeholder="不填无限制"
        type="tel"
        unit="次"
        )
        form-cell(
        title="每个用户每天参与次数"
        v-model="userWinFrequency"
        placeholder="不填无限制"
        type="tel"
        unit="次"
        )
      .cell-wrapper
        mt-cell(
        is-link
        title="使用说明"
        value="设置"
        v-on:click.native="$router.push({name: 'discount4.useInstructions'})"
        )
      button.btn.btn-reverse.btn-other(v-on:click="confirm")
        span  确定
      mt-actionsheet(
      :actions="autoDelayOptions"
      v-model="sheetShwon1"
      )
      mt-actionsheet(
      :actions="useWayOptions"
      v-model="sheetShwon2"
      )
      mt-actionsheet(
      :actions="effectTimeOptions"
      v-model="sheetShwon3"
      )
      mt-actionsheet(
      :actions="payChannelLimitOptions"
      v-model="sheetShwon4"
      )
      mt-actionsheet(
      :actions="donateFlagOptions"
      v-model="sheetShwon5"
      )
</template>

<script>
import FormCell from '@/components/FormCell.vue'
import { mapState, mapActions } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'discount4-other',
  data () {
    return {
      userWinCount: '',
      userWinFrequency: '',
      donateFlag: 'false',
      donateFlagOptions: [
        {name: '是', method: () => { this.donateFlag = 'true' }},
        {name: '否', method: () => { this.donateFlag = 'false' }}
      ],
      lowestLimit: '',
      hightestLimit: '',
      payChannelLimit: 'USE_NO_LIMIT',
      payChannelLimitOptions: [
        {name: '不限制', method: () => { this.payChannelLimit = 'USE_NO_LIMIT' }},
        {name: '仅限储值卡付款可享', method: () => { this.payChannelLimit = 'USE_ON_CURRENT_PAY_CHANNEL' }},
        {name: '储值卡付款时不可享', method: () => { this.payChannelLimit = 'NOT_ALLOWED_USE' }}
      ],
      effectTime: 'IMMEDIATELY',
      effectTimeOptions: [
        {name: '领取后立即生效', method: () => { this.effectTime = 'IMMEDIATELY' }},
        {name: '次日生效', method: () => { this.effectTime = 'DELAY' }}
      ],
      useway: 'DIRECT_SEND',
      distriAmount: '',
      useWayOptions: [
        {name: '需要用户领取', method: () => { this.useway = 'DIRECT_SEND' }},
        {name: '不需要用户领取', method: () => { this.useway = 'REAL_TIME_SEND' }}
      ],
      sheetShwon1: false,
      sheetShwon2: false,
      sheetShwon3: false,
      sheetShwon4: false,
      sheetShwon5: false,
      autoDelayFlag: 'N',
      autoDelayOptions: [
        {name: '是', method: () => { this.autoDelayFlag = 'Y' }},
        {name: '否', method: () => { this.autoDelayFlag = 'N' }}
      ]
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
      return this.$route.name !== 'discount4.other'
    }
  },
  components: {
    FormCell
  },
  methods: {
    ...mapActions('discount4Other', [
      'setDiscount4Other'
    ]),
    confirm () {
      let data = JSON.parse(JSON.stringify({
        autoDelayFlag: this.autoDelayFlag,
        distriAmount: this.distriAmount,
        useway: this.useway,
        effectTime: this.effectTime,
        payChannelLimit: this.payChannelLimit,
        useTime: this.useTime,
        donateFlag: this.donateFlag,
        userWinCount: this.userWinCount,
        userWinFrequency: this.userWinFrequency,
        useInstructions: this.useInstructions
      }))
      if (data.distriAmount && data.distriAmount <= 0) {
        Toast('发券总量需大于0')
        return true
      }
      this.setDiscount4Other(data)
      this.$router.push({name: 'discount4'})
    }
  },
  created () {
    let data = JSON.parse(JSON.stringify(this.$store.state.discount4Other.other))
    delete data.useTime
    delete data.useInstructions
    Object.assign(this.$data, data)
  }
}
</script>

<style lang="scss" scoped>
  button.btn-other {
    margin-top: get-vw(20px);
  }
</style>
