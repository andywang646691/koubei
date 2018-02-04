<template lang="pug">
  label.my-checkbox.control
    input(
      type="checkbox"
      v-bind:checked="isChecked"
      v-bind:value="value"
      v-on:change="updateValue($event.target.checked)"
    )
    span.control-indicator  {{ label }}
</template>

<script>
import is from 'is-type'
export default {
  name: 'my-checkbox',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: {
      type: String
    },
    modelValue: {
      default: false
    },
    label: {
      type: String
    },
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    }
  },
  computed: {
    isChecked () {
      if (is.array(this.modelValue)) {
        return this.modelValue.includes(this.value)
      }
      return this.modelValue === this.trueValue
    }
  },
  methods: {
    updateValue (isChecked) {
      if (is.array(this.modelValue)) {
        let newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  label.my-checkbox {
    display: inline-block;
    span {
      display: inline-block;
      border: 2px solid $unCheckedColor;
      border-radius: 4px;
      width: get-vw(120px);
      line-height: get-vw(48px);
      text-align: center;
    }
  }
  input {
    display: none;
  }
  input[type="checkbox"]:checked ~ span {
    border-color: $checkedColor;
    display: inline-block;
  }
</style>
