<template lang="pug">
  .activity-wrapper
    .title-em 营销活动
    ul.activities.grid
      li
        a(v-on:click="$router.push({name: 'activity2'})")
          img(src="@/assets/5.png")
          span.desc-name  消费满送
      li
        a(v-on:click="$router.push({name: 'activity1'})")
          img(src="@/assets/6.png")
          span.desc-name  消费满减
</template>
<script>
export default {
  name: 'activity'
}
</script>

<style lang="scss" scoped>
  @import "../index.scss";
</style>
