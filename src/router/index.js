import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = r => require.ensure([], () => r(require('@/views/home/Home')), 'Home')
const CoupouExpired = r => require.ensure([], () => r(require('@/components/CoupouExpired')), 'CoupouExpired')
const discount1 = r => require.ensure([], () => r(require('@/views/coupous/discount1')), 'discount1')

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
          name: 'other',
          path: 'other',
          component: CoupouExpired
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
