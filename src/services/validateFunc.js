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
    },
    'discount-scope': function (value) {
      let num = +value
      if (is.number(num)) {
        return !(num >= 1.1 && num <= 9.9)
      }
      return true
    },
    'amt-compare': function (value) {
      let comparedValue = formData[associateParam]
      return value - comparedValue < 0
    }
  }
  return hasErrorFuncs[ruleType](value)
}

export default validateFunc
