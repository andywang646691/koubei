<template lang="pug">
  .coupous-wrapper
    .title-em 折扣券
    ul.coupous.grid
      li
        a(v-on:click="$router.push({name: 'discount1'})")
          img(src="@/assets/1.png")
          span.desc-name  全场折扣券
      li
        a(v-on:click="$router.push({name: 'discount2'})")
          img(src="@/assets/2.png")
          span.desc-name  全场代金券
      li
        a(v-on:click="$router.push({name: 'discount3'})")
          img(src="@/assets/3.png")
          span.desc-name  单品折扣券
      li
        a(v-on:click="$router.push({name: 'discount4'})")
          img(src="@/assets/4.png")
          span.desc-name  单品代金券
</template>

<script>
export default {
  name: 'coupous'
}
</script>

<style lang="scss" scoped>
  @import "../index.scss";
</style>
