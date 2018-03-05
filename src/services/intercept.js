import axios from 'axios'
import { Indicator } from 'mint-ui'
import lockedApis from './stateLock'
import indicatorApis from './indicator'

let lock = {}
function intercept ({ clientId = '150759774805270', transFrom = 'ALP' }) {
  axios.interceptors.request.use(function (config) {
    config.params = config.params ? { ...config.params, clientId, transFrom } : { clientId, transFrom, timeStamp: Date.now() }
    if (lock[config.url]) return Promise.reject(new Error('has a same request'))
    if (lockedApis.includes(config.url)) {
      lock[config.url] = true
    }
    if (indicatorApis.includes(config.url)) {
      Indicator.open()
    }
    return config
  }, error => Promise.reject(error))
  axios.interceptors.response.use(function (response) {
    let url = response.config.url
    if (lock[url]) lock[url] = false
    if (indicatorApis.includes(url)) Indicator.close()
    return response
  }, function (error) {
    let url = error.response.config.url
    if (lock[url]) lock[url] = false
    if (indicatorApis.includes(url)) Indicator.close()
  })
}

export { intercept }
