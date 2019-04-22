import Vue from 'vue'
import Router from 'vue-router'
import Page from '../components/Page.vue'
import Home from '../components/Home.vue'
import Post from '../components/Post.vue'
import Blog from '../components/Blog.vue'
import ContactPage from '../components/ContactPage.vue'
import post from '../store/modules/post'

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
      name: 'Blog',
      path: '/blog',
      component: Blog,
      props: route => ({ query: route.query.q, limit: 9 }),
      meta: {
        windowRedirectAfter: true
      }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactPage
    },
    {
      path: '/:year/:month/:day/:postSlug',
      name: 'Post',
      component: Post
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
