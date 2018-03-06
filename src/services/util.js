function getQueryString (href, key) {
  let hrefNoHash = href.split('#')[0]
  let string = hrefNoHash.split('?')[1] || ''
  let arr = string.split('&')
  let obj = arr.reduce((acc, cur, index) => {
    let arr = cur.split('=')
    acc[arr[0]] = arr[1]
    return acc
  }, {})
  return obj[key]
}

function checkEmoji (string) {
  let emojiRegex = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/
  return emojiRegex.test(string)
}

function filterEmoji (string) {
  let emojiRegex = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g
  return string.replace(emojiRegex, '')
}

function checkSpecChar (string) {
  let specCharRegex = /¥/
  return specCharRegex.test(string)
}
export { getQueryString, checkEmoji, filterEmoji, checkSpecChar }
