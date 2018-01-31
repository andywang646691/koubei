<template lang="pug">
  .coupou-expired
    mt-radio(
      :options="options",
      v-model="expiredShown"
    )
  .cell-wrapper(v-if="expiredShown === 'RELATIVE'")
    form-cell(
      title="券有效期"
      v-model="coupouExpired"
      unit="天"
      maxlength="3"
      type="tel"
    )
  .cell-wrapper(v-if="expiredShown === 'FIXED'")
</template>

<script>
import FormCell from '@/components/FormCell.vue'
export default {
  data () {
    return {
      expiredShown: 'RELATIVE',
      coupouExpired: '',
      options: [
        {
          label: '相对时间',
          vlaue: 'RELATIVE'
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