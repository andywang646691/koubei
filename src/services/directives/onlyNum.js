function onlyNumAndDot (el, binding, vnode) {
  let inputElem = el.querySelector('input') || el
  let context = vnode.context
  let expression = binding.expression
  inputElem.addEventListener('compositionstart', function () {
    console.log('compositionstart...')
    let newValue = inputElem.value.replace(/[^\d.]/, '')
    context[expression] = newValue
    inputElem.value = newValue
  })
}

export { onlyNumAndDot }
