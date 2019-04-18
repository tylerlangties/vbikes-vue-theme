import Vue from 'vue'
import Router from 'vue-router'
import Page from '../components/Page.vue'
import About from '../components/About.vue'
import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/:pageSlug',
      name: 'Page',
      component: Page,
      meta: {
        windowRedirectAfter: true
      },
      props: route => ({ query: route.query.q })
    }
  ]
})
