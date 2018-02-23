<template lang="pug">
  div
    router-view.nested-view(v-show="nestedView")
    .page-discount2(v-show="!nestedView")
      top-head
      .page-title  全场代金券
      .cell-wrapper
        form-cell(
        title="券名称"
        v-model="coupouName"
        )
        mt-cell(
        is-link
        title="适用门店"
        value="请选择"
        v-on:click.native="$router.push({name: 'discount2.stores'})"
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
        mt-cell(
        is-link
        title="领取人群限制"
        v-bind:value="crowdType | formatCrowdType"
        v-on:click.native="sheetShwon1 = true"
        )
      .cell-wrapper
        form-cell(
        title="优惠金额"
        unit="元"
        type="tel"
        v-model="worthValue"
        )
        form-cell(
        title="最低消费"
        unit="元"
        type="tel"
        v-model="lowestLimit"
        )
        mt-cell(
        is-link
        title="券有效期"
        v-bind:value="coupouExpiredView"
        v-on:click.native="$router.push({name: 'discount2.coupouExpired'})"
        )
      div.btn-list
        button.btn.btn-reverse.btn-other(v-on:click="$router.push({name: 'discount2.other'})")
          span  其他设置
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
</template>

<script>
import TopHead from '@/components/TopHead.vue'
import FormCell from '@/components/FormCell.vue'
import FileUploader from '@/components/FileUploader.vue'
import { format } from 'date-fns'
import { validateForm } from '@/services/helpers'
import { discount2Validation } from './validation'
import { mapGetters, mapState } from 'vuex'
import { createCampaign } from '@/apis/index'
import { Toast } from 'mint-ui'
export default {
  name: 'discount2',
  components: {
    FileUploader,
    TopHead,
    FormCell
  },
  data () {
    return {
      clientId: '150759774805270',
      logoUrl: '',
      logoId: '',
      coupouName: '',
      brandName: '',
      worthValue: '',
      lowestLimit: '',
      pickerStartValue: new Date(),
      pickerEndValue: new Date(),
      crowdType: '',
      sheetShwon1: false,
      peopleIsAllowed: [
        {
          name: '全体用户',
          method: () => { this.crowdType = '' }
        },
        {
          name: '大学生用户',
          method: () => { this.crowdType = 'STUDENT' }
        },
        {
          name: '新客专享',
          method: () => { this.crowdType = 'NEW_MEMBER_PROMO' }
        }
      ]
    }
  },
  computed: {
    ...mapGetters('coupouExpired', [
      'coupouExpiredView'
    ]),
    ...mapState('coupouExpired', [
      'expiredType',
      'coupouExpired',
      'expiredStart',
      'expiredEnd'
    ]),
    ...mapState('stores', [
      'shops'
    ]),
    ...mapState('discount2Other', [
      'other'
    ]),
    requestParams () {
      let params = {
        clientId: this.clientId,
        type: this.other.useway,
        name: `${this.coupouName}${format(new Date(), 'MMDD')}`,
        startTime: `${this.startDate} 00:00:00`,
        endTime: `${this.endDate} 23:59:59`,
        autoDelayFlag: this.other.autoDelayFlag,
        constraintInfo: {
          userWinCount: this.other.userWinCount,
          userWinFrequency: this.other.userWinFrequency ? `D||${this.other.userWinFrequency}` : '',
          crowdRestriction: this.crowdType,
          suitShops: this.shops,
          minCost: this.lowestLimit
        },
        budgetInfo: {
          budgetTotal: this.other.distriAmount,
          budgetType: 'QUANTITY'
        },
        promoTools: [
          {
            voucher: {
              worthValue: this.worthValue,
              brandName: this.brandName,
              donateFlag: this.other.donateFlag,
              delayInfo: {type: 'BYDAY', value: '1440'},
              effectType: this.other.effectTime,
              endTime: `${this.expiredEnd} 23:59:59`,
              startTime: `${this.expiredStart} 00:00:00`,
              logo: this.logoId,
              logoQiniu: this.logoUrl,
              maxAmount: this.other.hightestLimit,
              name: this.coupouName,
              rate: (+this.discount * 0.1).toFixed(2),
              relativeTime: this.coupouExpired,
              type: 'MONEY',
              useInstructions: this.other.useInstructions,
              useRule: {
                limitRule: this.other.payChannelLimit,
                minConsume: this.lowestLimit,
                suitShops: this.shops,
                useTime: this.other.useTime
              },
              validateType: this.expiredType
            },
            sendRule: {
              minCost: this.lowestLimit
            }
          }
        ],
        publishChannels: [
          {
            type: 'SHOP_DETAIL',
            name: '店铺页投放'
          },
          {
            type: 'SHORT_LINK',
            name: '短连接投放'
          }
        ]
      }
      if (!this.other.distriAmount) delete params.budgetInfo
      return params
    },
    nestedView () {
      return this.$route.name !== 'discount2'
    },
    startDate () {
      return format(this.pickerStartValue, 'YYYY-MM-DD')
    },
    endDate () {
      return format(this.pickerEndValue, 'YYYY-MM-DD')
    }
  },
  methods: {
    submit () {
      // 需校验的字段
      let formData = {
        coupouName: this.coupouName,
        shops: this.shops,
        pickerStartValue: this.pickerStartValue,
        pickerEndValue: this.pickerEndValue,
        brandName: this.brandName,
        logo: this.logoId,
        crowdType: this.crowdType,
        worthValue: this.worthValue,
        lowestLimit: this.lowestLimit,
        coupouExpired: this.coupouExpiredView.slice(0, -1),
        useInstructions: this.other.useInstructions
      }
      console.log(`result: ${validateForm(formData, discount2Validation)}`)
      if (validateForm(formData, discount2Validation)) return true
      createCampaign(this.requestParams).then(res => {
        let data = res.data
        if (data.status === 0) {
          Toast('创建新活动成功')
          this.$router.push('/')
        } else {
          Toast(data.msg)
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
  .page-discount2 {
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
