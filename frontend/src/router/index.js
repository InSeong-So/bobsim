import Vue from 'vue'
import Router from 'vue-router'
import bobsimMain from '@/components/bobsimMain'
import bobsimHome from '@/components/bobsimHome'
import bobsimRecommended from '@/components/bobsimRecommended'
import login from '@/components/login/login'
import signUp from '@/components/login/signUp'

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
    // {
    //   path: '/',
    //   name: 'bobsimMain',
    //   component: bobsimMain,
    //   props: true,
    // },
    {
      path: '/',
      name: 'bobsimHome',
      component: bobsimHome,
      props: true,
      // beforeEnter: requireAuth(),
    },
    {
      path: '/recommended',
      name: 'bobsimRecommended',
      component: bobsimRecommended,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      props: true,
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp,
      props: true,
    },
  ]
})
