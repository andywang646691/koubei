import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = r => require.ensure([], () => r(require('@/views/home/Home')), 'Home')

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})
