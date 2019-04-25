import api from '../../api'
import * as types from '../mutations'

// initial state
const state = {
  id: '',
  logged_in: false,
  users: []
}

// getters
const getters = {
  userId: state => state.id,
  allUsers: state => state.users
}

// actions
const actions = {
  getAllUsers({ commit }) {
    api.getUsers(users => {
      commit(types.STORE_FETCHED_USERS, { users })
    })
  }
}

// mutations
const mutations = {
  [types.STORE_FETCHED_USER](state, { uid }) {
    state.id = uid
  },

  [types.STORE_FETCHED_USERS](state, { users }) {
    state.users = users
  },

  [types.LOGIN_USER](state) {
    state.logged_in = true
  },

  [types.LOGOUT_USER](state) {
    state.logged_in = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
