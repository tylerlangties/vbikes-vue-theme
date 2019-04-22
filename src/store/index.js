import Vue from 'vue'
import Vuex from 'vuex'
import page from './modules/page'
import hub from './modules/hub'
import post from './modules/post'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hub,
    page,
    post
  }
})
