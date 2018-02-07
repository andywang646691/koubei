<template lang="pug">
  .coupou-expired.fill-view.bg-gray
    mt-radio(
      :options="options",
      v-model="expiredType"
    )
    .cell-wrapper(v-show="expiredType === 'RELATIVE'")
      form-cell(
        title="券有效期"
        v-model="coupouExpired"
        unit="天"
        maxlength="3"
        type="tel"
      )
    .cell-wrapper(v-show="expiredType === 'FIXED'")
      mt-cell(
      is-link
      title="有效开始时间"
      v-bind:value="expiredStart"
      v-on:click.native="openPicker('expired-start')"
      )
      mt-cell(
      is-link
      title="有效结束时间"
      v-bind:value="expiredEnd"
      v-on:click.native="openPicker('expired-end')"
      )
      mt-datetime-picker(
        ref="expired-start"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        v-bind:value="expiredStartValue"
        v-on:confirm="expiredStartValue = arguments[0]"
      )
      mt-datetime-picker(
        ref="expired-end"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        v-bind:value="expiredEndValue"
        v-on:confirm="expiredEndValue = arguments[0]"
      )
    button.btn.btn-reverse.btn-other(v-on:click="confirm")
      span  确定
</template>

<script>
import FormCell from '@/components/FormCell.vue'
import { format } from 'date-fns'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      expiredStartValue: new Date(this.$store.state.coupouExpired.expiredStart),
      expiredEndValue: new Date(this.$store.state.coupouExpired.expiredEnd),
      coupouExpired: this.$store.state.coupouExpired.coupouExpired,
      expiredType: this.$store.state.coupouExpired.expiredType,
      options: [
        {
          label: '相对时间',
          value: 'RELATIVE'
        },
        {
          label: '绝对时间',
          value: 'FIXED'
        }
      ]
    }
  },
  computed: {
    expiredStart () {
      return format(this.expiredStartValue, 'YYYY-MM-DD')
    },
    expiredEnd () {
      return format(this.expiredEndValue, 'YYYY-MM-DD')
    }
  },
  components: {
    FormCell
  },
  methods: {
    ...mapActions('coupouExpired', [
      'setExpiredType',
      'setExpiredStartAndEnd',
      'setCoupouExpired'
    ]),
    openPicker (id) {
      this.$refs[id].open()
    },
    confirm () {
      this.setExpiredType(this.expiredType)
      if (this.expiredType === 'RELATIVE') {
        this.setCoupouExpired(this.coupouExpired)
      } else {
        this.setExpiredStartAndEnd({expiredStart: this.expiredStart, expiredEnd: this.expiredEnd})
      }
      this.$router.push({ name: 'discount1' })
    }
  },
  created () {
    document.title = '券有效期'
  },
  destroyed () {
    document.title = '灵犀数字营销'
  }
}
</script>

<style scoped lang="scss">
  button {
    margin-top: get-vw(20px);
  }
</style>
