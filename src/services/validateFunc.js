import is from 'is-type'
// return true 代表未通过校验
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
    },
    'promoTools': function (value) {
      if (is.array(value) && value.length > 0) {
        return !value.every(obj => is.object(obj) && obj.voucher)
      }
      return true
    }
  }
  return hasErrorFuncs[ruleType](value)
}

export default validateFunc
