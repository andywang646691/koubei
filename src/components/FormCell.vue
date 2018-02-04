<template lang="pug">
  .mint-cell
    .mint-cell-wrapper
      .mint-cell-title
        slot(name="title")
          .mint-cell-text(v-text="title")
      .mint-cell-value(v-if="!unit")
        input(
          :value="value"
          v-bind:type="type"
          v-on:input="updateValue($event.target.value)"
          v-bind:placeholder="placeholder"
          v-bind:maxlength="maxlength"
        )
      .mint-cell-value(v-if="unit" class="unit-cell")
        input(
        :value="value"
        v-bind:type="type"
        v-on:input="updateValue($event.target.value)"
        v-bind:placeholder="placeholder"
        v-bind:maxlength="maxlength"
        )
        span  {{ unit }}
</template>

<script>

export default {
  name: 'form-cell',
  props: {
    type: {default: 'text'},
    title: {},
    value: {},
    unit: {},
    maxlength: { default: 15 },
    placeholder: {
      default: '请输入'
    }
  },
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
  .mint-cell-value {
    margin-right: 24px;
  }
  .unit-cell span {
    margin-top: 3px;
  }
  .unit-cell input{
    padding: 0 get-vw(13px);
    max-width: get-vw(240px);
    ::-webkit-input-placeholder {
      font-size: 16px;
    }
  }
</style>
