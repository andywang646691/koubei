<template lang="pug">
div
  router-view.nested-view(v-show="nestedView")
  .use-time.fill-view.bg-gray(v-show="!nestedView")
    <!--use-time-item(v-for="")-->
    .btn-list
      button.btn.btn-reverse.btn-other(v-on:click="$router.push({name: 'useTime.item'})")
        span  添加
      button.btn.btn-green.btn-other(v-on:click="$router.push({name: 'discount1.other'})")
        span 确定
</template>

<script>
import UseTimeItem from '@/components/UseTimeItem.vue'
export default {
  name: 'use-time',
  data () {
    return {
    }
  },
  computed: {
    nestedView () {
      let viewName = this.$route.name.split('.').reverse()[0]
      return viewName === 'item'
    }
  },
  components: {
    UseTimeItem
  }
}
</script>

<style lang="scss" scoped>
</style>
