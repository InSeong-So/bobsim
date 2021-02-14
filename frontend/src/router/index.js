import Vue from 'vue'
import Router from 'vue-router'
import bobsimMain from '@/components/bobsimMain'
import bobsimHome from '@/components/bobsimHome'
import bobsimRecommended from '@/components/bobsimRecommended'
import bobsimMypage from '@/components/bobsimMypage'
import bobsimSignUp from '@/components/login/bobsimSignUp'

/** 같은 페이지에서 같은 페이지로 $router.push 한 오률를 처리함 (ex : 홈페이지에서 홈 로고를 클릭한 경우) */
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(() => {
    return window.location.reload()
  })
};

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = false

  if (isAuthenticated) {
    return next()
  }

  next('/login?returnPath=mypage')
}

export default new Router({
  mode: 'history',
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
