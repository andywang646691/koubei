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
</template>

<script>
import TopHead from '@/components/TopHead.vue'
import FormCell from '@/components/FormCell.vue'
export default {
  name: 'discount1',
  components: {
    TopHead,
    FormCell
  },
  data () {
    return {
      coupouName: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-discount1 {
    min-height: 100vh;
    background-color: #f6f6f9;
  }
  .page-title {
    margin-bottom: get-vw(25px);
    background: white;
    padding: get-vw(20px) get-vw(30px);
  }

</style>
