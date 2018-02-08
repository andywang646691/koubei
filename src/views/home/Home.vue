<template lang="pug">
  .home
    top-head
    Coupous.row-gap
    Activity.row-gap
</template>

<script>
import Coupous from './children/Coupons.vue'
import Activity from './children/Activity.vue'
import TopHead from '@/components/TopHead.vue'

export default {
  name: 'home',
  components: {
    Coupous,
    Activity,
    TopHead
  }
}
</script>

<style lang="scss" scoped>
  .row-gap {
    margin-top: 20px;
  }
  .home {
    padding: 0 get-vw(9px);
  }
</style>
