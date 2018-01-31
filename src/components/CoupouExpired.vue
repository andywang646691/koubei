<template lang="pug">
  .coupou-expired
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
    button.btn.btn-reverse.btn-other(v-on:click="$router.push({name: 'discount1'})")
      span  确定
</template>

<script>
import FormCell from '@/components/FormCell.vue'
export default {
  data () {
    return {
      coupouExpired: '',
      expiredType: 'RELATIVE',
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
  components: {
    FormCell
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
  .coupou-expired {
    background: $bgGray;
  }
  button {
    margin-top: get-vw(20px);
  }
</style>
