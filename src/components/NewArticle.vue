<template>
     <ArticleForm title="New title" body="" author="" published= "" v-on:addArticle="addArticle" />
</template>

<script>

import ArticleForm from '@/components/ArticleForm.vue'
import store from '../store'
export default {
    components: {
        ArticleForm
    },
    methods: {
        addArticle: function(article){
            let newArticle = {
                id: store.state.articles.length+1,
                ...article
            }
            store.commit('addArticle', newArticle);
            console.log(article.title);
            this.$router.push('/');
        }
    }
    
};
</script>

<style scoped>

</style>

