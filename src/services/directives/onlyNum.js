function onlyNumAndDot (el, binding, vnode) {
  let value = binding.value
  vnode.context[binding.expression] = value.replace(/[^\d.]/, '')
}

export { onlyNumAndDot }
