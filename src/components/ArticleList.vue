<template>
    <div >
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
                        <v-card height="auto" 
                        :color="cardColor(article)"
                        
                        >
                            <v-card-title 
                            >{{ article.title }}</v-card-title>
                            <v-card-subtitle>{{article.author}}</v-card-subtitle>
                            <v-card-actions>
                                <v-btn  
                                text
                                color="black"
                                :to="'/articles/' + article.id">
                                Подробнее
                                </v-btn>

                                <v-spacer></v-spacer>

                                <v-btn 
                                color="black" 
                                text
                                small 
                                dark
                                @click="togglePublishedState(article)">
                                {{ article.published ? 'Снять с публикации' : 'Опубликовать' }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    </v-row>
                </v-container>
            </div>
            <p v-else>
                No articles in the list.
            </p>
                        
        </ul>
        
        <v-btn v-if="loading" @click="cancelRequest">Cancel</v-btn>
        <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </template>

   
                <!-- v-on:state="article.published=!article.published" -->
  
  <script>

import axios from 'axios';
import {loadArticles} from '@/services/articlesService'
import store from '../store'

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
        togglePublishedState(article) {
           
            const newPublishedState = !article.published
            console.log(`${store.state.articles}`)
            axios.patch(`http://localhost:10000/articles/${article.id}`, { published: newPublishedState })
          .then(response => {
            console.log(response);
            store.dispatch('CHANGE_ARTICLE_PUBLISHED', { articleId: article.id, published: !article.published })            
          })
        
        }
    },

    
    beforeMount()  {
        this.loadArticles();
    }
    };
</script>
