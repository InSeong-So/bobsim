import Vue from 'vue'
import Router from 'vue-router'
import roulette from '@/components/roulette'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'roulette',
      component: roulette,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      props: true,
    },
  ]
})
