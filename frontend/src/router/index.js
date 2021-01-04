import Vue from 'vue'
import Router from 'vue-router'
import roulette from '@/components/roulette'
import login from '@/components/login'

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = false

  if (isAuthenticated) {
    return next()
  }

  next('/login?returnPath=/')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'roulette',
      component: roulette,
      props: true,
      // beforeEnter: requireAuth(),
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      props: true,
    },
  ]
})
