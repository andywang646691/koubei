<template lang="pug">
div
  router-view.nested-view(v-show="nestedView")
  .discount1-other.fill-view.bg-gray(v-show="!nestedView")
    .cell-wrapper.top-item
      mt-cell(
        is-link
        title="自动延长上架时间"
        v-bind:value="autoDelayFlag | boolTransform"
        v-on:click.native="sheetShwon1 = true"
      )
      form-cell(
        title="发放总量"
        unit="张"
        maxlength="3"
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
        v-bind:value="useTime"
        v-on:click.native="$router.push({name: 'other.useTime'})"
      )
      form-cell(
        title="最低消费"
        v-model="lowestLimit"
        type="tel"
        placeholder="不填无限制"
      )
      form-cell(
        title="最高消费"
        type="tel"
        v-model="hightestLimit"
        placeholder="不填无限制"
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
        unit="次"
      )
      form-cell(
        title="每个用户总共参与次数"
        v-model="userWinFrequency"
        placeholder="不填无限制"
        unit="次"
      )
    button.btn.btn-reverse.btn-other(v-on:click="$router.push({name: 'discount1'})")
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
export default {
  name: 'discount1-other',
  data () {
    return {
      useTime: '',
      userWinCount: '',
      userWinFrequency: '',
      donateFlag: '0',
      donateFlagOptions: [
        {name: '是', method: () => { this.donateFlag = '1' }},
        {name: '否', method: () => { this.donateFlag = '0' }}
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
      autoDelayFlag: false,
      autoDelayOptions: [
        {name: '是', method: () => { this.autoDelayFlag = 'Y' }},
        {name: '否', method: () => { this.autoDelayFlag = 'N' }}
      ]
    }
  },
  computed: {
    nestedView () {
      return this.$route.name !== 'discount1.other'
    }
  },
  components: {
    FormCell
  },
  created () {
    document.title = '其他设置'
  }
}
</script>

<style lang="scss" scoped>
  button.btn-other {
    margin-top: get-vw(20px);
  }
</style>
