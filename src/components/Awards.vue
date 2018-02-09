<template lang="pug">
  .awards(v-if="awards.length > 0")
    p.label  奖品设置
    mt-cell(
    is-link
    v-bind:title="award.name | awardNameFromat"
    v-for="(award, index) in awards"
    v-bind:key="index"
    value="设置"
    v-on:click.native="$router.push(`${$route.path}/${award.name}/${index}`)"
    )
</template>

<script>
export default {
  name: 'awards',
  props: {
    awards: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  filters: {
    awardNameFromat (code) {
      switch (code) {
        case 'coupou-globalDiscount': return '全场折扣券'
        case 'coupou-globalMoney': return '全场现金券'
        case 'coupou-signalDiscount': return '单品折扣券'
        case 'coupou-signalMoney': return '单品现金券'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .label {
    color: $gray;
    display: block;
    font-size: 12px;
    margin: 8px;
  }
</style>
