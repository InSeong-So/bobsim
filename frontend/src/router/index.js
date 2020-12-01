import Vue from 'vue'
import Router from 'vue-router'
import roulette from '@/components/roulette'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'roulette',
      component: roulette
    },
  ]
})
