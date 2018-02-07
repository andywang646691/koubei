import is from 'is-type'
function validateFunc ({formData, param, ruleType, associateParam}) {
  let value = formData[param]
  let hasErrorFuncs = {
    required: function (value) {
      if (is.string(value) && value) {
        return false
      }
      if (is.array(value)) {
        return !value.length
      }
      return true
    },
    'date-compare': function (value) {
      let comparedValue = formData[associateParam]
      if (is.date(value)) {
        return value - comparedValue > 0
      }
      return true
    },
    pattern: function (value) {
      return /[^\d.]/.test(value)
    }
  }
  return hasErrorFuncs[ruleType](value)
}

export default validateFunc
