import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ArticleForm from './components/ArticleForm.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.component('ArticleForm', ArticleForm);


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
// store.dispatch('fetchArticles');

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
