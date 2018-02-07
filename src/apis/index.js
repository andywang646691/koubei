
import axios from 'axios'
import { allShopApi, alpCreateCampaign } from './apis'

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

export { getShopInfo, createCampaign }
