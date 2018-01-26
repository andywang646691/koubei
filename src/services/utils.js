import { Toast } from 'mint-ui'
import axios from 'axios'

function returnFileSize (bytes) {
  if (typeof bytes === 'number') {
    return (bytes / (1024 * 1024)).toFixed(1)
  }
}

function getFileFromDom (elem) {
  let matchType = elem.value.match(/\.(.+)$/)
  return {
    file: elem.files[0],
    type: matchType && matchType[1]
  }
}

function uploadFile ({fileElem, url, data, uploaderName = '图片'}) {
  return axios({
    method: 'POST',
    url,
    data
  }).then(res => {
    return res.data
  }).catch(() => {
    Toast(`${uploaderName}上传失败`)
  })
}

export { returnFileSize, uploadFile, getFileFromDom }
