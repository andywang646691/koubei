import axios from 'axios'
import lockedApis from './stateLock'

let lock = {}
function intercept ({ clientId = '150759774805270', transFrom = 'ALP' }) {
  axios.interceptors.request.use(function (config) {
    config.params = config.params ? { ...config.params, clientId, transFrom } : { clientId, transFrom }
    if (lock[config.url]) return Promise.reject(new Error('has a same request'))
    if (lockedApis.includes(config.url)) {
      lock[config.url] = true
    }
    return config
  }, error => Promise.reject(error))
  axios.interceptors.response.use(function (response) {
    let url = response.config.url
    if (lock[url]) lock[url] = false
    return response
  }, function (error) {
    console.log(error)
  })
}

export { intercept }
