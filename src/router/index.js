import Vue from 'vue'
import Router from 'vue-router'
import Page from '../components/Page.vue'
import Home from '../components/Home.vue'
import App from '../App.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: route => ({ query: route.query.q })
    },
    {
      name: 'Page',
      path: '/:pageSlug',
      component: Page,
      props: route => ({ query: route.query.q }),
      meta: {
        windowRedirectAfter: true
      }
    }
  ]
})
