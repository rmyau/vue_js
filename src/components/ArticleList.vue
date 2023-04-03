<template>
    <div class="hello">
        <div v-if="loading" >
            <v-progress-circular
            color="yellow"
            indeterminate
            :size="40"
            :width="6"
            ></v-progress-circular>
        </div>

        <ul v-if="!loading">
            <div v-if="articles.length">
                <v-container>
                    <v-row>
                    <v-col
                        v-for="article in articles"
                        :key="article.id"
                        cols="4"
                    >
                        <v-card height="150" width = 400
                        :color="cardColor(article)"
                        >
                            <v-btn :to="'/articles/' + article.id"
                            >{{ article.title }}</v-btn>
                            <v-card-subtitle>{{article.author}}</v-card-subtitle>
                        </v-card>
                        
                    </v-col>
                    </v-row>
                </v-container>
               
            </div>
            <p v-else>
                No articles in the list.
            </p>
        </ul>
        <button v-if="loading" @click="cancelRequest">Cancel</button>
        <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </template>

   
                <!-- v-on:state="article.published=!article.published" -->
  
  <script>

import axios from 'axios';
import {loadArticles} from '@/services/articlesService'

export default{
    name: 'ArticleList',
    props: {
        msg:String
    },
    components: {
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
                this.$store.state.articles = data;
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
        },
        cardColor(article) {
        if (article.published) {
            return "green"; 
        } else {
            return "red"; 
        }
        },
    },

    
    beforeMount()  {
        this.loadArticles();
    }
    };
</script>
