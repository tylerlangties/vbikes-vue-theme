import api from '../../api'
import _ from 'lodash'
import * as types from '../mutations'

const createPostSlug = post => {
  let slug = post.link.replace(
    'http://' + window.location.hostname + ':8888',
    ''
  )
  slug = slug.replace('https://' + window.location.hostname + ':8888', '')
  post.slug = slug
  return post
}

// initial state
const state = {
  recent: [],
  loaded: false,
  allPosts: []
}

// getters
const getters = {
  recentPosts: state => limit => {
    if (
      !limit ||
      !_.isNumber(limit) ||
      _.isNull(limit) ||
      typeof limit == 'undefined'
    ) {
      return state.recent
    }
    let recent = state.recent
    return recent.slice(0, limit)
  },
  recentPostsLoaded: state => state.loaded,

  getPostIndex: state => id => {
    return state.recent.findIndex(post => post.id == id)
  },
  getPostByIndex: state => index => {
    return state.recent[index]
  },
  getPostBySlug: state => slug => {
    return state.recent.find(post => post.slug == slug)
  }
}

// actions
const actions = {
  getPosts({ commit }, { limit }) {
    api.getPosts(limit, posts => {
      posts.map((post, i) => {
        posts[i] = createPostSlug(post)
      })

      commit(types.STORE_FETCHED_POSTS, { posts })
      commit(types.POSTS_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  },
  getAllPosts({ commit }) {
    api.getAllPosts(posts => {
      posts.map((post, i) => {
        posts[i] = createPostSlug(post)
      })

      commit(types.STORE_FETCHED_POSTS, { posts })
      commit(types.POSTS_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  }
}

// mutations
const mutations = {
  [types.STORE_FETCHED_POSTS](state, { posts }) {
    state.recent = posts
  },

  [types.POSTS_LOADED](state, val) {
    state.loaded = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
