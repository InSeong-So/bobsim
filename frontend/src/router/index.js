import Vue from 'vue'
import Router from 'vue-router'
import roulelett from '@/components/roulelett'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'roulelett',
      component: roulelett
    }
  ]
})
