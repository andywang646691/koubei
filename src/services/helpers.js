import axios from 'axios'
import { Toast } from 'mint-ui'
import validateFunc from './validateFunc'
import { getAplAuth } from '@/apis/index'
import { getQueryString } from '@/services/util'

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

function checkAuth () {
  let authCode = getQueryString(location.href, 'auth_code')
  let alpUserInfo = {}
  return getAplAuth(authCode, 'ALP').then(res => {
    let data = res.data
    if (data.status === 0) {
      let result = data.data
      alpUserInfo = {
        clientId: result.clientId,
        userId: result.userId,
        name: result.name
      }
    } else {
      alert('授权失败!')
    }
    return alpUserInfo
  })
}

export { returnFileSize, uploadFile, getFileFromDom, validateForm, checkAuth }
