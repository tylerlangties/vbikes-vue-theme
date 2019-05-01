import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import VueCarousel from 'vue-carousel'
import DateFilter from './filters/date'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faTags } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faTags)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueCarousel)
Vue.use(BootstrapVue)
Vue.filter('date', DateFilter)

import router from './router'
import store from './store'
import * as types from './store/mutations'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$ASSET_DIR = '/wp-content/themes/wordpress-vue/dist'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.commit(types.RESET_LOADING_PROGRESS)
    this.$store.dispatch('getAllCategories')
    this.$store.dispatch('getAllPosts')
    this.$store.dispatch('getAllPages')
  }
})
