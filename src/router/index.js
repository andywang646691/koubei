import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = r => require.ensure([], () => r(require('@/views/home/Home')), 'Home')
const CoupouExpired = r => require.ensure([], () => r(require('@/components/CoupouExpired')), 'CoupouExpired')
const discount1 = r => require.ensure([], () => r(require('@/views/coupous/discount1')), 'discount1')
const discount1Other = r => require.ensure([], () => r(require('@/views/coupous/discount1Other')), 'discount1Other')
const UseTime = r => require.ensure([], () => r(require('@/components/UseTime')), 'UseTime')
const UseTimeItem = r => require.ensure([], () => r(require('@/components/UseTimeItem')), 'UseTimeItem')
const UseInstructions = r => require.ensure([], () => r(require('@/components/UseInstructions')), 'UseInstructions')
const Stores = r => require.ensure([], () => r(require('@/components/Stores')), 'Stores')

let router = new Router({
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/',
      component: Home
    },
    {
      name: 'discount1',
      path: '/discount1',
      component: discount1,
      children: [
        {
          name: 'discount1.other',
          path: 'other',
          component: discount1Other,
          children: [
            {
              name: 'other.useTime',
              path: 'useTime',
              component: UseTime,
              children: [
                {
                  name: 'useTime.item',
                  path: 'item',
                  component: UseTimeItem
                }
              ]
            },
            {
              name: 'other.useInstructions',
              path: 'UseInstructions',
              component: UseInstructions
            }
          ]
        },
        {
          name: 'discount1.coupouExpired',
          path: 'coupouExpired',
          component: CoupouExpired
        },
        {
          name: 'discount1.stores',
          path: 'stores',
          component: Stores
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
