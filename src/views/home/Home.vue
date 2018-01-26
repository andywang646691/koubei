<template lang="pug">
  .home
    top-head
    Coupous.row-gap
    Activity.row-gap
    .cell-wrapper
      form-cell(
        title="标题文字"
        v-model="cellValue"
      )
      mt-cell(
      title="必填"
      value="我就是不填"
      )
      File-Uploader
</template>

<script>
import Coupous from './children/Coupons.vue'
import Activity from './children/Activity.vue'
import TopHead from '@/components/TopHead.vue'
import FormCell from '@/components/FormCell.vue'
import FileUploader from '@/components/FileUploader.vue'
export default {
  name: 'home',
  components: {
    Coupous,
    Activity,
    TopHead,
    FormCell,
    FileUploader
  },
  data () {
    return {
      cellValue: '这是我的文字',
      pickerValue: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .row-gap {
    margin-top: 20px;
  }
</style>
