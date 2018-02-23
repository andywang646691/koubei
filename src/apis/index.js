
import axios from 'axios'
import { allShopApi, alpCreateCampaign, aplAuth } from './apis'

function getShopInfo () {
  return axios({
    method: 'GET',
    url: allShopApi
  })
}

function createCampaign (data) {
  return axios({
    method: 'POST',
    url: alpCreateCampaign,
    data
  })
}

function getAplAuth (authCode) {
  return axios({
    method: 'GET',
    url: aplAuth,
    params: {
      authCode
    }
  })
}

export { getShopInfo, createCampaign, getAplAuth }
