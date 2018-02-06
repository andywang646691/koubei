
import axios from 'axios'
import { allShopApi, alpCreateCampaign } from './apis'

function getShopInfo () {
  return axios({
    method: 'GET',
    url: allShopApi
  })
}

function createCampaign () {
  return axios({
    method: 'POST',
    url: alpCreateCampaign
  })
}

export { getShopInfo, createCampaign }
