import is from 'is-type'
function validateFunc (formData, param, ruleType, associateParam) {
  let value = formData[param]
  let funcs = {
    required: function (value) {
      if (is.string(value) && value) {
        return false
      }
      return true
    },
    'date-compare': function (value) {
      let comparedValue = formData[associateParam]
      if (is.date(value)) {
        return value - comparedValue > 0
      }
      return true
    }
  }
  return funcs[ruleType](value)
}

export default validateFunc
