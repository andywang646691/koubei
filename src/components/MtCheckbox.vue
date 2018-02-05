<template lang="pug">
  label
    span.mint-checkbox
      input.mint-checkbox-input(type="checkbox" value="全选" v-bind:checked="isChecked" v-bind:value="value" v-on:change="updateValue($event.target.checked)")
      span.mint-checkbox-core
    span  {{ label }}
</template>

<script>
import MyCheckbox from '@/components/MyCheckbox'
export default {
  name: 'mt-checkbox',
  mixins: [MyCheckbox]
}
</script>

<style lang="scss" scoped>
  label {
    display: inline-block;
  }
  label > span:last-child {
    vertical-align: middle;
  }
</style>
