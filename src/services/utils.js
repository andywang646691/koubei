import axios from 'axios'
import { Toast } from 'mint-ui'
import validateFunc from './validateFunc'

function returnFileSize (bytes) {
  if (typeof bytes === 'number') {
    return (bytes / (1024 * 1024)).toFixed(1)
  }
}

function getFileFromDom (elem) {
  let file = elem.files[0]
  let matchType = file.name.match(/\.(.+)$/)
  return {
    file,
    size: file.size,
    type: matchType && matchType[1]
  }
}

function uploadFile ({fileElem, url, data, uploaderName = '图片'}) {
  return axios({
    method: 'POST',
    url,
    data
  }).then(res => {
    console.log(res.data)
    return res.data
  })
}

function validateForm (formData, validations) {
  let hasError = Object.keys(formData).some((param) => {
    return validations.some(validation => {
      if (validation.key === param) {
        let rules = validation.rule
        return rules.some(rule => {
          if (validateFunc({formData, param, ruleType: rule.name, pattern: rule.pattern, associateParam: validation.associateKey})) {
            Toast(rule.errMsg)
            return true
          } else {
            return false
          }
        })
      } else {
        return false
      }
    })
  })
  return hasError
}

export { returnFileSize, uploadFile, getFileFromDom, validateForm }
