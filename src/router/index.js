import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

Vue.use(Router)
const Home = r => require.ensure([], () => r(require('@/views/home/Home')), 'Home')
const CoupouExpired = r => require.ensure([], () => r(require('@/components/CoupouExpired')), 'CoupouExpired')
const discount1 = r => require.ensure([], () => r(require('@/views/coupous/discount1')), 'discount1')
const discount1Other = r => require.ensure([], () => r(require('@/views/coupous/discount1Other')), 'discount1Other')
const UseTime = r => require.ensure([], () => r(require('@/components/UseTime')), 'UseTime')
const UseTimeItem = r => require.ensure([], () => r(require('@/components/UseTimeItem')), 'UseTimeItem')
const UseInstructions = r => require.ensure([], () => r(require('@/components/UseInstructions')), 'UseInstructions')
const Stores = r => require.ensure([], () => r(require('@/components/Stores')), 'Stores')

const discount2 = r => require.ensure([], () => r(require('@/views/coupous/discount2')), 'discount2')
const discount2Other = r => require.ensure([], () => r(require('@/views/coupous/discount2Other')), 'discount2Other')

const discount3 = r => require.ensure([], () => r(require('@/views/coupous/discount3')), 'discount3')
const discount3Other = r => require.ensure([], () => r(require('@/views/coupous/discount3Other')), 'discount3Other')

const discount4 = r => require.ensure([], () => r(require('@/views/coupous/discount4')), 'discount4')
const discount4Other = r => require.ensure([], () => r(require('@/views/coupous/discount4Other')), 'discount4Other')

const activity1 = r => require.ensure([], () => r(require('@/views/activity/activity1')), 'activity1')
const activity1Other = r => require.ensure([], () => r(require('@/views/activity/activity1Other')), 'activity1Other')

const activity2 = r => require.ensure([], () => r(require('@/views/activity/activity2')), 'activity2')
const CoupouGlobalDiscount = r => require.ensure([], () => r(require('@/views/activity/coupous/CoupouGloalDiscount.vue')), 'CoupouGlobalDiscount')
const CoupouGlobalMoney = r => require.ensure([], () => r(require('@/views/activity/coupous/CoupouGlobalMoney.vue')), 'CoupouGlobalMoney')
const CoupouSignalDiscount = r => require.ensure([], () => r(require('@/views/activity/coupous/CoupouSignalDiscount.vue')), 'CoupouSignalDiscount')

function showRouteTitle (title) {
  document.title = title
  window.ap.setNavigationBar({
    title
  })
  return true
}

const routes = [
  {
    path: '',
    component: Home,
    meta: { title: '灵犀数字营销' }
  },
  {
    path: '/',
    component: Home,
    meta: { title: '灵犀数字营销' }
  },
  {
    name: 'discount1',
    path: '/discount1',
    component: discount1,
    meta: { title: '灵犀数字营销' },
    beforeEnter: (to, from, next) => {
      console.log('before enter')
      store.dispatch('resetAllState')
      next()
    },
    children: [
      {
        name: 'discount1.other',
        path: 'other',
        component: discount1Other,
        meta: { title: '其他设置' },
        children: [
          {
            name: 'other.useTime',
            path: 'useTime',
            component: UseTime,
            meta: { title: '使用时段' },
            children: [
              {
                name: 'useTime.item',
                path: 'item',
                component: UseTimeItem,
                meta: { title: '添加使用时段' }
              }
            ]
          },
          {
            name: 'other.useInstructions',
            path: 'UseInstructions',
            component: UseInstructions,
            meta: { title: '使用说明' }
          }
        ]
      },
      {
        name: 'discount1.coupouExpired',
        path: 'coupouExpired',
        component: CoupouExpired,
        meta: { title: '券有效期' }
      },
      {
        name: 'discount1.stores',
        path: 'stores',
        component: Stores,
        meta: { title: '适用门店' }
      }
    ]
  },
  {
    name: 'discount2',
    path: '/discount2',
    component: discount2,
    meta: { title: '灵犀数字营销' },
    beforeEnter: (to, from, next) => {
      store.dispatch('resetAllState')
      next()
    },
    children: [
      {
        name: 'discount2.other',
        path: 'other',
        component: discount2Other,
        meta: { title: '其他设置' },
        children: [
          {
            name: 'discount2.useTime',
            path: 'useTime',
            component: UseTime,
            meta: { title: '使用时段' },
            children: [
              {
                name: 'discount2.useTime.item',
                path: 'item',
                component: UseTimeItem,
                meta: { title: '添加使用时段' }
              }
            ]
          },
          {
            name: 'discount2.useInstructions',
            path: 'UseInstructions',
            component: UseInstructions,
            meta: { title: '使用说明' }
          }
        ]
      },
      {
        name: 'discount2.coupouExpired',
        path: 'coupouExpired',
        component: CoupouExpired,
        meta: { title: '券有效期' }
      },
      {
        name: 'discount2.stores',
        path: 'stores',
        component: Stores,
        meta: { title: '适用门店' }
      }
    ]
  },
  {
    name: 'discount3',
    path: '/discount3',
    component: discount3,
    meta: { title: '灵犀数字营销' },
    beforeEnter: (to, from, next) => {
      store.dispatch('resetAllState')
      next()
    },
    children: [
      {
        name: 'discount3.other',
        path: 'other',
        component: discount3Other,
        meta: { title: '其他设置' },
        children: [
          {
            name: 'discount3.useTime',
            path: 'useTime',
            component: UseTime,
            meta: { title: '使用时段' },
            children: [
              {
                name: 'discount3.useTime.item',
                path: 'item',
                component: UseTimeItem,
                meta: { title: '添加使用时段' }
              }
            ]
          },
          {
            name: 'discount3.useInstructions',
            path: 'UseInstructions',
            component: UseInstructions,
            meta: { title: '使用说明' }
          }
        ]
      },
      {
        name: 'discount3.coupouExpired',
        path: 'coupouExpired',
        component: CoupouExpired,
        meta: { title: '券有效期' }
      },
      {
        name: 'discount3.stores',
        path: 'stores',
        component: Stores,
        meta: { title: '适用门店' }
      }
    ]
  },
  {
    name: 'discount4',
    path: '/discount4',
    component: discount4,
    meta: { title: '灵犀数字营销' },
    beforeEnter: (to, from, next) => {
      store.dispatch('resetAllState')
      next()
    },
    children: [
      {
        name: 'discount4.other',
        path: 'other',
        component: discount4Other,
        meta: { title: '其他设置' },
        children: [
          {
            name: 'discount4.useTime',
            path: 'useTime',
            component: UseTime,
            meta: { title: '使用时段' },
            children: [
              {
                name: 'discount4.useTime.item',
                path: 'item',
                component: UseTimeItem,
                meta: { title: '添加使用时段' }
              }
            ]
          },
          {
            name: 'discount4.useInstructions',
            path: 'UseInstructions',
            component: UseInstructions,
            meta: { title: '使用说明' }
          }
        ]
      },
      {
        name: 'discount4.coupouExpired',
        path: 'coupouExpired',
        component: CoupouExpired,
        meta: { title: '券有效期' }
      },
      {
        name: 'discount4.stores',
        path: 'stores',
        component: Stores,
        meta: { title: '适用门店' }
      }
    ]
  },
  {
    name: 'activity1',
    path: '/activity1',
    component: activity1,
    meta: { title: '灵犀数字营销' },
    beforeEnter: (to, from, next) => {
      store.dispatch('resetAllState')
      next()
    },
    children: [
      {
        name: 'activity1.other',
        path: 'other',
        component: activity1Other,
        meta: { title: '其他设置' },
        children: [
          {
            name: 'activity1.useTime',
            path: 'useTime',
            component: UseTime,
            meta: { title: '使用时段' },
            children: [
              {
                name: 'activity1.useTime.item',
                path: 'item',
                component: UseTimeItem,
                meta: { title: '添加使用时段' }
              }
            ]
          },
          {
            name: 'activity1.useInstructions',
            path: 'UseInstructions',
            component: UseInstructions,
            meta: { title: '使用说明' }
          }
        ]
      },
      {
        name: 'activity1.coupouExpired',
        path: 'coupouExpired',
        component: CoupouExpired,
        meta: { title: '券有效期' }
      },
      {
        name: 'activity1.stores',
        path: 'stores',
        component: Stores,
        meta: { title: '适用门店' }
      }
    ]
  },
  {
    name: 'activity2',
    path: '/activity2',
    component: activity2,
    meta: { title: '灵犀数字营销' },
    beforeEnter: (to, from, next) => {
      store.dispatch('resetAllState')
      next()
    },
    children: [
      {
        name: 'coupou-globalDiscount',
        path: 'coupou-globalDiscount/:index',
        component: CoupouGlobalDiscount,
        meta: { title: '全场折扣券' },
        children: [
          {
            name: 'coupou-globalDiscount.useTime',
            path: 'useTime',
            component: UseTime,
            meta: { title: '使用时段' },
            children: [
              {
                name: 'coupou-globalDiscount.useTime.item',
                path: 'item',
                component: UseTimeItem,
                meta: { title: '添加使用时段' }
              }
            ]
          },
          {
            name: 'coupou-globalDiscount.useInstructions',
            path: 'useInstructions',
            component: UseInstructions,
            meta: { title: '使用说明' }
          }
        ]
      },
      {
        name: 'coupou-globalMoney',
        path: 'coupou-globalMoney/:index',
        component: CoupouGlobalMoney,
        meta: { title: '全场代金券' },
        children: [
          {
            name: 'coupou-globalMoney.useTime',
            path: 'useTime',
            component: UseTime,
            meta: { title: '使用时段' },
            children: [
              {
                name: 'coupou-globalMoney.useTime.item',
                path: 'item',
                component: UseTimeItem,
                meta: { title: '添加使用时段' }
              }
            ]
          },
          {
            name: 'coupou-globalMoney.useInstructions',
            path: 'useInstructions',
            component: UseInstructions,
            meta: { title: '使用说明' }
          }
        ]
      },
      {
        name: 'coupou-signalDiscount',
        path: 'coupou-signalDiscount/:index',
        component: CoupouSignalDiscount,
        meta: { title: '单品折扣券' },
        children: [
          {
            name: 'coupou-signalDiscount.useTime',
            path: 'useTime',
            component: UseTime,
            meta: { title: '使用时段' },
            children: [
              {
                name: 'coupou-signalDiscount.useTime.item',
                path: 'item',
                component: UseTimeItem,
                meta: { title: '添加使用时段' }
              }
            ]
          },
          {
            name: 'coupou-signalDiscount.useInstructions',
            path: 'useInstructions',
            component: UseInstructions,
            meta: { title: '使用说明' }
          }
        ]
      },
      {
        name: 'activity2.stores',
        path: 'stores',
        component: Stores,
        meta: { title: '适用门店' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/',
    meta: { title: '灵犀数字营销' }
  }
]

let router = new Router({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  showRouteTitle(to.meta.title)
  next()
})

export default router
