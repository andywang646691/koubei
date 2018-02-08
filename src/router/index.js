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
    component: Home
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
                name: 'discount2.item',
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
    path: '*',
    redirect: '/'
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
