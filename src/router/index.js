import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/page/StartPage.vue'
import Home from '@/components/page/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },
    {
      path: '/home/:path',
      name: 'Home',
      component: Home,
      props : true
    }
  ]
})
