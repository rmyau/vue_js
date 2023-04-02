import Vue from 'vue'
// import store from 'vue'
import VueRouter from 'vue-router'
import ArticleList from '../components/ArticleList.vue'
import my_about from '../my_about.vue'
// import ArticleForm from '../components/ArticleForm.vue'
// import Names_articles from '../components/names_articles.vue'
// import Home_list from '../components/Home_list.vue'
import NewArticle from '../components/NewArticle.vue'
Vue.use(VueRouter)
const routes =[
    {
        path: '/',
        component: ArticleList
    },
    {
        path: '/about',
        // name: 'About',
        component: my_about
    },
    {
        path: '/new',
        name: 'Add new article',
        component: NewArticle
    },
    
    
    // {
    //     path: '/articles/:id',
    //     component: Names_articles,
    //     props: (route) => store.state.articles.find((x) => x.id == route.params.id)
    // }
]

const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes
})

export default router