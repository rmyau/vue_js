<template>
    <div class="hello">
        
        <div v-if="loading" >
            <!-- <v-progress-circular color="blue-lighten-3" indeterminate></v-progress-circular> -->
            <v-progress-circular
            color="yellow"
            indeterminate
            :size="40"
            :width="6"
            ></v-progress-circular>
        </div>
        <ul v-if="!loading">
            <div v-if="articles.length">
                <ArticleBlock
                    v-for="article in articles" 
                    :key="article.id"
                    :title="article.title"
                    :body="article.body"
                    :published="article.published"
                    :author="article.author"
                    v-on:state="article.published=!article.published"
                />
            </div>
            <p v-else>
                No articles in the list.
            </p>
        </ul>
        <button v-if="loading" @click="cancelRequest">Cancel</button>
        <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
import ArticleBlock from './ArticleBlock.vue'
import axios from 'axios';
import {loadArticles} from '@/services/articlesService'

export default{
    name: 'ArticleList',
    props: {
        msg:String
    },
    components: {
        ArticleBlock
    },
   
    data() {
        
        return { 
            articles: [],
            loading: false,
            cancelTokenSource: null,
            errorMessage: ''        
        }
        
    },
    methods:
    {
         loadArticles: async function(){

            this.loading=true;
            this.articles=[];
            this.cancelTokenSource = axios.CancelToken.source();

            loadArticles(this.cancelTokenSource)
            .then(data => {
                this.articles = data;
            })
            .catch(error => {
                console.error(error);
                this.errorMessage = error.message;
            })
            .finally(() => {
                this.loading = false;
            });   
            
        },
        cancelRequest() {
            if (this.loading && this.cancelTokenSource) {
            this.cancelTokenSource.cancel('Request cancelled');
            }
        }
    },
    
    beforeMount()  {
        this.loadArticles();
    }
    };
</script>
