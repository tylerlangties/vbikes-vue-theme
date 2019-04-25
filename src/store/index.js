import Vue from 'vue'
import Vuex from 'vuex'
import page from './modules/page'
import hub from './modules/hub'
import categories from './modules/categories'
import user from './modules/user'
import post from './modules/post'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hub,
    user,
    page,
    post,
    categories
  }
})
