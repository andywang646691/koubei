<template lang="pug">
  div
    router-view.nested-view(v-show="nestedView")
    .page-discount3(v-show="!nestedView")
      top-head
      .page-title  单品折扣券
      .cell-wrapper
        form-cell(
        title="券名称"
        v-model="coupouName"
        )
        mt-cell(
        is-link
        title="适用门店"
        v-bind:value="storeTips"
        v-on:click.native="$router.push({name: 'discount3.stores'})"
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
        title="优惠商品最低购买件数"
        v-model="gdDiscountLowestAmt"
        )
        form-cell(
        title="优惠商品最高优惠件数"
        v-model="gdDiscountHighestAmt"
        )
        form-cell(
        title="折扣力度"
        unit="折"
        maxlength="3"
        v-model="discount"
        )
        mt-cell(
        is-link
        title="券有效期"
        v-bind:value="coupouExpiredView"
        v-on:click.native="$router.push({name: 'discount3.coupouExpired'})"
        )
      div.btn-list
        button.btn.btn-reverse.btn-other(v-on:click="$router.push({name: 'discount3.other'})")
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
import { discount3Validation } from './validation'
import { mapGetters, mapState } from 'vuex'
import { createCampaign } from '@/apis/index'
import { Toast } from 'mint-ui'
export default {
  name: 'discount3',
  components: {
    FileUploader,
    TopHead,
    FormCell
  },
  data () {
    return {
      clientId: this.$store.state.alpUserInfo.clientId || '150759774805270',
      gdName: '',
      gdCode: '',
      gdDetail: '',
      logoUrl: '',
      logoId: '',
      gdUrl: '',
      gdId: '',
      gdDiscountLowestAmt: '',
      gdDiscountHighestAmt: '',
      coupouName: '',
      brandName: this.$store.state.alpUserInfo.name || '',
      discount: '8.5',
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
    ...mapState('discount3Other', [
      'other'
    ]),
    storeTips () {
      return this.shops.length === 0 ? '请选择' : `${this.shops.length}家门店`
    },
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
          minCost: this.other.lowestLimit
        },
        budgetInfo: {
          budgetTotal: this.other.distriAmount,
          budgetType: 'QUANTITY'
        },
        promoTools: [
          {
            voucher: {
              brandName: this.brandName,
              donateFlag: this.other.donateFlag,
              delayInfo: {type: 'BYDAY', value: '1440'},
              effectType: this.other.effectTime,
              endTime: `${this.expiredEnd} 23:59:59`,
              startTime: `${this.expiredStart} 00:00:00`,
              logo: this.logoId,
              logoQiniu: this.logoUrl,
              voucherImg: this.gdId,
              voucherImgQiniu: this.gdUrl,
              itemInfo: {
                itemIds: [this.gdCode],
                itemName: this.gdName,
                itemText: this.gdDetail,
                maxDiscountNum: this.gdDiscountHighestAmt,
                minConsumeNum: this.gdDiscountLowestAmt
              },
              maxAmount: this.other.hightestLimit,
              name: this.coupouName,
              rate: (+this.discount * 0.1).toFixed(2),
              relativeTime: this.coupouExpired,
              type: 'RATE',
              useInstructions: this.other.useInstructions,
              useRule: {
                limitRule: this.other.payChannelLimit,
                minConsume: this.other.lowestLimit,
                suitShops: this.shops,
                useTime: this.other.useTime
              },
              validateType: this.expiredType
            },
            sendRule: {
              minCost: this.other.lowestLimit
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
      if (this.other.useway === 'REAL_TIME_SEND') {
        // 不需要用户领取
        params.publishChannels = params.publishChannels.filter(item => item.type !== 'SHORT_LINK')
      }
      return params
    },
    nestedView () {
      return this.$route.name !== 'discount3'
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
        discount: this.discount,
        coupouExpired: this.coupouExpiredView.slice(0, -1),
        useInstructions: this.other.useInstructions,
        gdName: this.gdName,
        gdCode: this.gdCode,
        gdDetail: this.gdDetail,
        gdId: this.gdId,
        gdDiscountLowestAmt: this.gdDiscountLowestAmt,
        gdDiscountHighestAmt: this.gdDiscountHighestAmt
      }
      console.log(`result: ${validateForm(formData, discount3Validation)}`)
      if (validateForm(formData, discount3Validation)) return true
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
  .page-discount3 {
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
