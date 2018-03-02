
import axios from 'axios'
import { allShopApi, alpCreateCampaign, aplAuth, refreshShopApi } from './apis'

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

function refreshShop () {
  return axios({
    method: 'GET',
    url: refreshShopApi
  })
}

export { getShopInfo, createCampaign, getAplAuth, refreshShop }
