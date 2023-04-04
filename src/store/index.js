import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Types } from './types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articles: [],
    status: null
  },
  getters: {
    articles: state => state.articles
  },
  mutations: {
    [Types.mutations.ARTICLES_REQUESTED](state) {
      state.status = Types.request_status.REQUESTED
    },
    [Types.mutations.ARTICLES_SUCCEEDED](state, articles) {
      state.status = Types.request_status.SUCCEEDED
      state.articles = articles
    },
    [Types.mutations.ARTICLES_FAILED](state) {
      state.status = Types.request_status.FAILED
      state.articles = []
    },
    [Types.mutations.ARTICLES_CANCELED](state) {
      state.status = Types.request_status.CANCELED
    },
    [Types.mutations.ARTICLE_ADD_REQUESTED](state) {
      state.status = Types.request_status.REQUESTED
    },
    [Types.mutations.ARTICLE_ADD_SUCCEEDED](state, article) {
      state.status = Types.request_status.SUCCEEDED
      state.articles.push(article)
    },
    [Types.mutations.ARTICLE_ADD_FAILED](state) {
      state.status = Types.request_status.FAILED
    },
    [Types.mutations.ARTICLE_PUBLISHED_CHANGED](state, { articleId, published }) {
      const article = state.articles.find(article => article.id === articleId)
      if (article) {
        article.published = published
      }
    },
    [Types.mutations.ARTICLE_DELETED](state, articleId) {
      state.articles = state.articles.filter(article => article.id !== articleId);
    }
    
  },
  actions: {
    [Types.actions.LOAD_ARTICLES]({ commit }) {
      commit(Types.mutations.ARTICLES_REQUESTED)
      axios.get('/http://localhost:10000/articles')
        .then(response => {
          commit(Types.mutations.ARTICLES_SUCCEEDED, response.data)
        })
        .catch(() => {
          commit(Types.mutations.ARTICLES_FAILED)
        })
    },
    [Types.actions.CANCEL_ARTICLES_REQUEST]({ commit }) {
      commit(Types.mutations.ARTICLES_CANCELED)
    },
    [Types.actions.ADD_ARTICLE]({ commit }, article) {
      commit(Types.mutations.ARTICLE_ADD_REQUESTED)
      axios.post('/http://localhost:10000/articles', article)
        .then(response => {
          commit(Types.mutations.ARTICLE_ADD_SUCCEEDED, response.data)
        })
        .catch(() => {
          commit(Types.mutations.ARTICLE_ADD_FAILED)
        })
    },
    [Types.actions.CHANGE_ARTICLE_PUBLISHED]({ commit }, { articleId, published }) {
      commit(Types.mutations.ARTICLE_PUBLISHED_CHANGED, { articleId, published })
    },
    [Types.actions.DELETE_ARTICLE]({ commit }, articleId) {
        commit(Types.mutations.ARTICLE_DELETED, articleId);
    }
  }
})

export default store