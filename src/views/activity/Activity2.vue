<template lang="pug">
  div
    router-view.nested-view(v-show="nestedView")
    .page-activity2(v-show="!nestedView")
      top-head
      .page-title  消费满送
      .cell-wrapper
        form-cell(
        title="活动名称"
        v-model="activeName"
        )
        mt-cell(
        is-link
        title="适用门店"
        v-bind:value="storeTips"
        v-on:click.native="$router.push({name: 'activity2.stores'})"
        )
      .cell-wrapper
        mt-cell(
        is-link
        title="活动开始时间"
        v-bind:value="startDate"
        v-on:click.native="openPicker('picker-start')"
        )
        mt-cell(
        is-link
        title="活动结束时间"
        v-bind:value="endDate"
        v-on:click.native="openPicker('picker-end')"
        )
        form-cell(
        title="品牌名称"
        v-model="brandName"
        )
      .cell-wrapper
        file-uploader(
        title="券LOGO"
        v-bind:clientId="clientId"
        v-on:logoUrl="logoUrl = arguments[0]"
        v-on:logoId="logoId = arguments[0]"
        )
        <!--mt-cell(-->
        <!--is-link-->
        <!--title="自动续期"-->
        <!--v-bind:value="autoDelayFlag | boolTransform"-->
        <!--v-on:click.native="sheetShwon2 = true"-->
        <!--)-->
        form-cell(
        title="发放总量"
        v-model="budgetTotal"
        placeholder="不填无限制"
        type="tel"
        )
      .cell-wrapper
        form-cell(
        title="用户总共参与次数"
        v-model="userWinCount"
        placeholder="不填无限制"
        type="tel"
        unit="次"
        )
        form-cell(
        title="用户每天参与次数"
        v-model="userWinFrequency"
        placeholder="不填无限制"
        type="tel"
        unit="次"
        )
      .cell-wrapper
        form-cell(
        title="活动最低消费"
        v-model="minCost"
        placeholder="不填无限制"
        type="tel"
        )
        mt-cell(
        is-link
        title="参与活动人群"
        v-bind:value="crowdType | formatCrowdType"
        v-on:click.native="sheetShwon1 = true"
        )
      awards(:awards="promoTools")
      div.btn-list
        button.btn.btn-reverse.btn-other(v-on:click="sheetShwon3 = true")
          span  添加奖品
        button.btn.btn-green.btn-submit(v-on:click="submit")
          span 提交
      mt-datetime-picker(
      ref="picker-start"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      v-bind:value="pickerStartValue"
      v-on:confirm="pickerStartValue = arguments[0]"
      )
      mt-datetime-picker(
      ref="picker-end"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      v-bind:value="pickerEndValue"
      v-on:confirm="pickerEndValue = arguments[0]"
      )
      mt-actionsheet(
      :actions="peopleIsAllowed"
      v-model="sheetShwon1"
      )
      mt-actionsheet(
      :actions="autoDelayOptions"
      v-model="sheetShwon2"
      )
      mt-actionsheet(
      :actions="awardsOption"
      v-model="sheetShwon3"
      )
</template>

<script>
import TopHead from '@/components/TopHead.vue'
import FormCell from '@/components/FormCell.vue'
import FileUploader from '@/components/FileUploader.vue'
import { format } from 'date-fns'
import { validateForm } from '@/services/helpers'
import { activity2Validation } from './validation'
import { mapState, mapActions } from 'vuex'
import { createCampaign } from '@/apis/index'
import { Toast } from 'mint-ui'
import Awards from '@/components/Awards.vue'
export default {
  name: 'activity2',
  components: {
    FileUploader,
    TopHead,
    FormCell,
    Awards
  },
  data () {
    return {
      clientId: this.$store.state.alpUserInfo.clientId || '150759774805270',
      budgetTotal: '',
      minCost: '',
      logoUrl: '',
      logoId: '',
      activeName: '',
      brandName: this.$store.state.alpUserInfo.name || '',
      pickerStartValue: new Date(),
      pickerEndValue: new Date(),
      crowdType: '',
      userWinCount: '',
      userWinFrequency: '',
      sheetShwon1: false,
      sheetShwon2: false,
      sheetShwon3: false,
      peopleIsAllowed: [
        {
          name: '全体用户',
          method: () => { this.crowdType = '' }
        },
        {
          name: '新客专享',
          method: () => { this.crowdType = 'NEW_MEMBER_PROMO' }
        }
      ],
      autoDelayFlag: 'N',
      autoDelayOptions: [
        {name: '是', method: () => { this.autoDelayFlag = 'Y' }},
        {name: '否', method: () => { this.autoDelayFlag = 'N' }}
      ],
      awardsOption: [
        {
          name: '全场折扣券',
          label: 'coupou-globalDiscount',
          method: () => this.promoTools.length < 4 ? this.setPromoToolsItem({item: {name: 'coupou-globalDiscount', voucherObj: {}}}) : Toast('最多添加四种不同的券')
        },
        {
          name: '全场代金券',
          label: 'coupou-globalMoney',
          method: () => this.promoTools.length < 4 ? this.setPromoToolsItem({item: {name: 'coupou-globalMoney', voucherObj: {}}}) : Toast('最多添加四种不同的券')
        },
        {
          name: '单品折扣券',
          label: 'coupou-signalDiscount',
          method: () => this.promoTools.length < 4 ? this.setPromoToolsItem({item: {name: 'coupou-signalDiscount', voucherObj: {}}}) : Toast('最多添加四种不同的券')
        },
        {
          name: '单品代金券',
          label: 'coupou-signalMoney',
          method: () => this.promoTools.length < 4 ? this.setPromoToolsItem({item: {name: 'coupou-signalMoney', voucherObj: {}}}) : Toast('最多添加四种不同的券')
        }
      ]
    }
  },
  computed: {
    ...mapState('stores', [
      'shops'
    ]),
    ...mapState('awards', [
      'promoTools'
    ]),
    storeTips () {
      return this.shops.length === 0 ? '请选择' : `${this.shops.length}家门店`
    },
    promoToolsChange () {
      return this.promoTools.length
    },
    realPromoTools () {
      return this.promoTools.map(promoToolsItem => {
        let voucher = promoToolsItem.voucherObj.voucher || {}
        if (voucher.useRule) voucher.useRule.suitShops = this.shops
        Object.assign(voucher, {
          brandName: this.brandName,
          endTime: `${this.endDate} 23:59:59`,
          startTime: `${this.startDate} 00:00:00`,
          logo: this.logoId,
          logoQiniu: this.logoUrl,
          name: this.activeName,
          validateType: 'FIXED'
        })
        return promoToolsItem.voucherObj
      })
    },
    requestParams () {
      let params = {
        clientId: this.clientId,
        type: 'CONSUME_SEND',
        name: `${this.activeName}${format(new Date(), 'MMDD')}`,
        startTime: `${this.startDate} 00:00:00`,
        endTime: `${this.endDate} 23:59:59`,
        autoDelayFlag: this.autoDelayFlag,
        constraintInfo: {
          userWinCount: this.userWinCount,
          userWinFrequency: this.userWinFrequency ? `D||${this.userWinFrequency}` : '',
          crowdRestriction: this.crowdType,
          suitShops: this.shops
        },
        budgetInfo: {
          budgetTotal: this.budgetTotal,
          budgetType: 'QUANTITY'
        },
        promoTools: this.realPromoTools
      }
      if (!this.budgetTotal) delete params.budgetInfo
      if (params.promoTools.length === 1) {
        params.promoTools[0].sendRule.minCost = this.minCost || '0.01'
      } else {
        params.constraintInfo.minCost = this.minCost || '0.01'
      }
      return params
    },
    nestedView () {
      return this.$route.name !== 'activity2'
    },
    startDate () {
      return format(this.pickerStartValue, 'YYYY-MM-DD')
    },
    endDate () {
      return format(this.pickerEndValue, 'YYYY-MM-DD')
    }
  },
  methods: {
    ...mapActions('awards', ['setPromoToolsItem']),
    submit () {
      // 需校验的字段
      let formData = {
        activeName: this.activeName,
        shops: this.shops,
        pickerStartValue: this.pickerStartValue,
        pickerEndValue: this.pickerEndValue,
        brandName: this.brandName,
        logo: this.logoId,
        crowdType: this.crowdType,
        budgetTotal: this.budgetTotal,
        promoTools: this.realPromoTools
      }
      if (formData.budgetTotal && formData.budgetTotal <= 0) {
        Toast('发券总量需大于0')
        return true
      }
      if (validateForm(formData, activity2Validation)) return true
      createCampaign(this.requestParams).then(res => {
        let data = res.data
        if (data.status === 0) {
          Toast('创建新活动成功')
          this.$router.push('/')
        } else {
          Toast(data.msg.replace(/\w+/, ''))
        }
      }).catch(err => Toast(err))
    },
    openPicker (id) {
      this.$refs[id].open()
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-activity2 {
    min-height: 100vh;
    background-color: $bgGray;
    padding-bottom: 40px;
  }
  .page-title {
    margin-bottom: get-vw(25px);
    background: white;
    padding: get-vw(20px) get-vw(30px);
  }

</style>
