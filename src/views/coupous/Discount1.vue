<template lang="pug">
  .page-discount1
    top-head
    .page-title  全场折扣券
    .cell-wrapper
      form-cell(
        title="券名称"
        v-model="coupouName"
      )
      mt-cell(
        is-link
        title="适用门店"
        value="请选择"
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
      )
      mt-cell(
        is-link
        title="领取人群限制"
        v-bind:value="crowdType | formatCrowdType"
        v-on:click.native="sheetShwon1 = true"
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
        title="券有效期"
        value="7天"
        v-on:click.native=""
      )
    button.btn.btn-reverse.btn-other(v-on:click="$log(discount)")
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
import { validateForm } from '@/services/utils'
import { discount1Validation } from './validation'
export default {
  name: 'discount1',
  components: {
    FileUploader,
    TopHead,
    FormCell
  },
  created () {
    window.vue = this
  },
  data () {
    return {
      coupouName: '',
      brandName: '',
      discount: '8.5',
      pickerStartValue: new Date(),
      pickerEndValue: new Date(),
      crowdType: 'ALL',
      sheetShwon1: false,
      peopleIsAllowed: [
        {
          name: '全体用户',
          method: () => { this.crowdType = 'ALL' }
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
    startDate () {
      return format(this.pickerStartValue, 'YYYY-MM-DD')
    },
    endDate () {
      return format(this.pickerEndValue, 'YYYY-MM-DD')
    }
  },
  methods: {
    submit () {
      let formData = {
        coupouName: this.coupouName,
        discount: this.discount,
        pickerStartValue: this.pickerStartValue,
        pickerEndValue: this.pickerEndValue
      }
      console.log(`result: ${validateForm(formData, discount1Validation)}`)
    },
    openPicker (id) {
      this.$refs[id].open()
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-discount1 {
    min-height: 100vh;
    background-color: #f6f6f9;
    padding-bottom: 40px;
  }
  .page-title {
    margin-bottom: get-vw(25px);
    background: white;
    padding: get-vw(20px) get-vw(30px);
  }
  button {
    margin-top: get-vw(20px);
  }

</style>
