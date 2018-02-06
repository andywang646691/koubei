import axios from 'axios'
function intercept ({ clientId = '150759774805270', transFrom = 'ALP' }) {
  axios.interceptors.request.use(function (config) {
    config.params = config.params ? { ...config.params, clientId, transFrom } : { clientId, transFrom }
    return config
  }, error => Promise.reject(error))
}

export { intercept }
