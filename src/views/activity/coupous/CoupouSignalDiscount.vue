<template lang="pug">
  div
    router-view.nested-view(v-show="nestedView")
    .coupou-signalDiscount.fill-view.bg-gray(v-show="!nestedView")
      .cell-wrapper
        form-cell(
        title="商品名称"
        v-model="gdName"
        )
        form-cell(
        title="商品编码"
        v-model="gdCode"
        )
        file-uploader(
        title="商品图片"
        v-bind:clientId="clientId"
        flag="gd"
        v-on:gdUrl="gdUrl = arguments[0]"
        v-on:gdId="gdId = arguments[0]"
        )
        mt-field(
        type="textarea"
        rows="3"
        v-model="gdDetail"
        label="商品详情"
        class="flex-item-start"
        placeholder="120字以内"
        v-bind:attr="{maxlength: 120}"
        )
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
        v-on:click.native="$router.push({name: 'coupou-signalDiscount.useTime'})"
        )
        form-cell(
        title="最低消费"
        v-model="lowestLimit"
        type="tel"
        placeholder="不填无限制"
        )
        form-cell(
        title="优惠商品最低购买件数"
        v-model="gdDiscountLowestAmt"
        )
        form-cell(
        title="优惠商品最高优惠件数"
        v-model="gdDiscountHighestAmt"
        )
      .cell-wrapper
        mt-cell(
        is-link
        title="使用说明"
        value="设置"
        v-on:click.native="$router.push({name: 'coupou-signalDiscount.useInstructions'})"
        )
        form-cell(
        title="发券数量"
        type="tel"
        v-model="sendNum"
        placeholder="不填无限制"
        )
      .btn-list
        button.btn.btn-reverse.btn-other(v-on:click="confirm")
          span  确定
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
import FileUploader from '@/components/FileUploader.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'coupou-signalDiscount',
  data () {
    return {
      clientId: this.$store.state.alpUserInfo.clientId || '150759774805270',
      gdName: '',
      gdCode: '',
      gdDetail: '',
      gdUrl: '',
      gdId: '',
      gdDiscountLowestAmt: '',
      gdDiscountHighestAmt: '',
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
        {name: '领取后立即生效', method: () => { this.effectTime = 'IMMEDIATELY' }},
        {name: '次日生效', method: () => { this.effectTime = 'DELAY' }}
      ],
      donateFlag: '0',
      donateFlagOptions: [
        {name: '是', method: () => { this.donateFlag = '1' }},
        {name: '否', method: () => { this.donateFlag = '0' }}
      ],
      lowestLimit: '',
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
      return this.$route.name !== 'coupou-signalDiscount'
    }
  },
  components: {
    FormCell,
    FileUploader
  },
  methods: {
    ...mapActions('awards', [
      'setPromoToolsItem'
    ]),
    confirm () {
      let voucherItem = {
        discount: this.discount,
        effectTime: this.effectTime,
        payChannelLimit: this.payChannelLimit,
        lowestLimit: this.lowestLimit,
        donateFlag: this.donateFlag,
        sendNum: this.sendNum,
        useTime: this.useTime,
        useInstructions: this.useInstructions,
        gdName: this.gdName,
        gdCode: this.gdCode,
        gdDetail: this.gdDetail,
        gdUrl: this.gdUrl,
        gdId: this.gdId,
        gdDiscountLowestAmt: this.gdDiscountLowestAmt,
        gdDiscountHighestAmt: this.gdDiscountHighestAmt
      }
      let voucherObj = JSON.parse(JSON.stringify({
        voucher: {
          rate: (+this.discount * 0.1).toFixed(2),
          type: 'RATE',
          delayInfo: {type: 'BYDAY', value: '1440'},
          effectType: this.effectTime,
          maxAmount: this.hightestLimit,
          donateFlag: this.donateFlag,
          useInstructions: this.useInstructions,
          voucherImg: this.gdId,
          voucherImgQiniu: this.gdUrl,
          itemInfo: {
            itemIds: [this.gdCode],
            itemName: this.gdName,
            itemText: this.gdDetail,
            maxDiscountNum: this.gdDiscountHighestAmt,
            minConsumeNum: this.gdDiscountLowestAmt
          },
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
      this.setPromoToolsItem({item: { name: 'coupou-signalDiscount', voucherObj }, index: this.$route.params.index, voucherItem})
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
