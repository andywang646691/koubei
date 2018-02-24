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

export { getQueryString }
