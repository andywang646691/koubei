
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

export { getShopInfo, createCampaign, getAplAuth }
