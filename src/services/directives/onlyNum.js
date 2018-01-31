function onlyNumAndDot (el, binding, vnode) {
  let inputElem = el.querySelector('input') || el
  let context = vnode.context
  let expression = binding.expression
  let value = binding.value
  Object.defineProperty(context, expression, {
    get () {
      return value
    },
    set (val) {
      inputElem.value = val
      value = val
    }
  })
  context[expression] = value
  inputElem.addEventListener('input', function () {
    context[expression] = inputElem.value.replace(/[^\d.]/, '')
  })
}

export { onlyNumAndDot }
