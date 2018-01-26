<template lang="pug">
  .mint-cell
    .mint-cell-wrapper
      .mint-cell-title
        slot(name="title")
          .mint-cell-text(v-text="title")
      .mint-cell-value
        input(
          :value="value"
          v-on:input="updateValue($event.target.value)"
        )
</template>

<script>

export default {
  name: 'form-cell',
  props: ['title', 'value'],
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    font-size: 16px;
    text-align: right;
    height: 36px;
    color: #888;
  }
  input:focus {
    color: black;
  }
</style>
