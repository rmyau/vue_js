<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <ul v-if="articles.length">
        <ArticleBlock
          v-for="article in articles" 
          :key="article.id"
          :title="article.title"
          :body="article.body"
          :published="article.published"
          :author="article.author"
          v-on:state="article.published=!article.published"
        />
      </ul>
      <p v-else>
        No articles in the list.
      </p>
      <div>ВСЕГО СТАТЕЙ: {{countArticles}}</div>
      
      <!-- <ArticleForm title="New title" body="" author="" published= "" v-on:add-article="addArticle" /> -->
    </div>
  </template>
  
  <script>
import ArticleBlock from './ArticleBlock.vue'
import store from '../store'
// import { computed } from 'vue';
export default{
    name: 'ArticleList',
    props: {
        msg:String
    },
    components: {
        ArticleBlock
    },

    computed: 
    {
        getArticles(){
            return store.state.articles
        },
        countArticles(){
            return store.state.articles.length
        }

    },
    
    data() {
        
        return {
            articles: store.state.articles
            // count: countArticles()           
        }
        
    },

    methods:{
        // addArticle: function (article) {
        //     let newArticle = {
        //         id: this.articles.length+1,
        //         ...article
        //     }
        //     this.articles.push(newArticle);
        //     console.log(article.title);
        // }
    },
    // beforeMount: function(){
    //     fetch('/articles.json')
    //     .then(response => response.json())
    //     .then(articles => this.articles = articles);
    //     console.log('Fetch data');
    // }

};
</script>

<style scoped>
h3{
    margin:40px 0 0;
}
ul {
    list-style-type: none;
    padding:0;
}
li {
    display: inline-block;
    margin:0 10px;
}
a {
    color: #42b983;
}