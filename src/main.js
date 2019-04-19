import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import VueCarousel from 'vue-carousel'

Vue.use(VueCarousel)
Vue.use(BootstrapVue)

import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$ASSET_DIR = '/wp-content/themes/wordpress-vue/dist'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('getAllPages')
  }
})
