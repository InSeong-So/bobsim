import Vue from 'vue'
import Router from 'vue-router'
import bobsimMain from '@/components/bobsimMain'
import bobsimHome from '@/components/bobsimHome'
import bobsimRecommended from '@/components/bobsimRecommended'
import bobsimMypage from '@/components/bobsimMypage'
import bobsimSignUp from '@/components/login/bobsimSignUp'

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = false

  if (isAuthenticated) {
    return next()
  }

  next('/login?returnPath=mypage')
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
    },
    {
      path: '/recommended',
      name: 'bobsimRecommended',
      component: bobsimRecommended,
      props: true,
    },
    {
      path: '/mypage',
      name: 'bobsimMypage',
      component: bobsimMypage,
      // beforeEnter: requireAuth(),
      props: true,
    },
    {
      path: '/signUp',
      name: 'bobsimSignUp',
      component: bobsimSignUp,
      props: true,
    },
  ]
})
