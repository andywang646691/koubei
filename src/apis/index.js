
import axios from 'axios'
import { allShopApi } from './apis'

function getShopInfo () {
  return axios({
    method: 'GET',
    url: allShopApi
  })
}

export { getShopInfo }
