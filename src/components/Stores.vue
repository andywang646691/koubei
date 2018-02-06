<template lang="pug">
  .stores.fill-view.bg-gray
    .total
      mt-checkbox(label="全选" v-model="allChecked")
      span  共 {{ storeCount }}
    .cell-wrapper(v-for="city in shopInCityList")
      mt-checklist(
        v-bind:title="city.cityName"
        v-model="shops"
        v-bind:options="city.shopOptions"
      )
</template>

<script>
import MtCheckbox from '@/components/MtCheckbox'
import { getShopInfo } from '@/apis/index'
import { Toast } from 'mint-ui'
export default {
  name: 'stores',
  data () {
    return {
      storeCount: '4',
      cityList: [],
      allChecked: false,
      shops: []
    }
  },
  computed: {
    allShops () {
      return this.cityList.reduce((acc, city) => {
        city.shops.forEach(shop => {
          acc.push(shop.shopId)
        })
        return acc
      }, [])
    },
    shopInCityList () {
      return this.cityList.map(city => {
        let shops = city.shops
        city.shopOptions = shops.map(shop => {
          return {
            label: shop.branchShopName ? `${shop.mainShopName} (${shop.branchShopName})` : `${shop.mainShopName}`,
            value: shop.shopId
          }
        })
        return city
      })
    }
  },
  watch: {
    allChecked (val) {
      if (val) {
        this.shops = this.allShops
      } else {
        this.shops = []
      }
    }
  },
  components: {
    MtCheckbox
  },
  created () {
    document.title = '适用门店'
    getShopInfo().then(res => {
      let data = res.data
      if (data.status === 0) {
        this.storeCount = data.shopCount
        let flag = []
        let newData = data.data.reduce((acc, cur) => {
          let { cityCode, cityName, shopId, mainShopName, branchShopName } = cur
          let shop = {
            shopId,
            mainShopName,
            branchShopName
          }
          let index = flag.indexOf(cityCode)
          if (index === -1) {
            flag.push(cityCode)
            acc.push({
              cityCode,
              cityName,
              shops: [shop]
            })
          } else {
            acc[index].shops.push(shop)
          }
          return acc
        }, [])
        this.cityList = newData
      }
    }).catch(error => Toast(error))
  }
}
</script>

<style lang="scss" scoped>
  .total > *:last-child{
    vertical-align: middle;
    margin-left: 15px;
  }
  .total {
    background: white;
    min-height: 48px;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
</style>
