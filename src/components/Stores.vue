<template lang="pug">
  .stores.fill-view.bg-gray
    .total
      mt-checkbox(label="全选" v-model="allChecked")
      span  共 {{ storeCount }}
    .cell-wrapper
      mt-checklist(
        title="上海市"
        v-model="hello"
        v-bind:options="['款款火锅(尚勤店)', '选项B', '选项C']"
      )
    .cell-wrapper
      mt-checklist(
        title="上海市"
        v-model="hello"
        v-bind:options="['款款火锅(尚勤店)', '选项B', '选项C']"
      )
</template>

<script>
import MtCheckbox from '@/components/MtCheckbox'
export default {
  name: 'stores',
  data () {
    return {
      storeCount: '4',
      allChecked: false,
      hello: []
    }
  },
  components: {
    MtCheckbox
  }
}
</script>

<style lang="scss" scoped>
  .total > *:last-child{
    vertical-align: middle;
    margin-left: 15px;
  }
  .total {
    background: white;
    min-height: 48px;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
</style>
