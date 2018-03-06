
import axios from 'axios'
import { allShopApi, alpCreateCampaign, aplAuth, refreshShopApi } from './apis'
import { checkEmoji, checkSpecChar } from '@/services/util'
import { Toast } from 'mint-ui'

function getShopInfo () {
  return axios({
    method: 'GET',
    url: allShopApi
  })
}

function createCampaign (data) {
  if (checkEmoji(JSON.stringify(data))) {
    return Toast('请不要输入特殊字符(如： 颜文字、表情等)')
  }
  if (checkSpecChar(JSON.stringify(data))) {
    return Toast('请不要输入特殊字符(如： ¥等)')
  }
  return axios({
    method: 'POST',
    url: alpCreateCampaign,
    data
  })
}

function getAplAuth (authCode, transFrom) {
  return axios({
    method: 'GET',
    url: aplAuth,
    params: {
      authCode,
      transFrom
    }
  })
}

function refreshShop () {
  return axios({
    method: 'GET',
    url: refreshShopApi
  })
}

export { getShopInfo, createCampaign, getAplAuth, refreshShop }
