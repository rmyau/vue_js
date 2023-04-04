<template>
     <v-container class="d-flex fill-height justify-center align-center">
        <v-layout>
            <v-layout column justify-center>
                <v-carousel
                    cycle
                    hide-delimiters
                    height="300"
                    >
                        <v-carousel-item
                            v-for="i in 3"
                            :key="i"
                        >
                            <v-sheet
                            :color=generateLightColor()
                            height="400"
                            width="100%"
                            tile
                            class="d-flex fill-height justify-center align-center"
                            >
                            <div class="d-flex fill-height justify-center align-center">
                                <div class="text-h2">
                                {{ i}} image
                            </div>
                            </div>
                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                <v-card>
                    <v-card-title class="text-h4">
                        {{ article.title }}
                    </v-card-title>
                    <v-card-subtitle class="text-subtitle">{{ article.author }}</v-card-subtitle>
                    <v-card-text style="font-size: 20px;">{{ article.body }}</v-card-text>
                    <v-btn 
                        color="red" 
                        text
                        small 
                        @click="deleteArticle(article.id)"
                        >
                        Удалить
                        </v-btn>
                </v-card>
            </v-layout>
            <div >
                    <v-img :width="200" height="300" cover  src="../assets/image.png"></v-img>
                    <v-img :width="200" height="300" cover  src="../assets/image.png"></v-img>
                </div>
            
        </v-layout>
        
     </v-container>

</template>

<script>
import store from '../store'
import axios from 'axios';
export default {
    name: 'ArticleBlock',
    props: {
        id: {
    type:Number,
      required: true
    }
        
    },
    
    computed: {
        upperAuthor(){
            return this.author.toUpperCase();
        },
        article() {
        console.log(`${this.$store.state.articles.find(article => article.id === Number(this.id))}`)
            return this.$store.state.articles.find(article => article.id === Number(this.id));
        
        }
        
    },
    methods: {
        generateLightColor() {
            let color = "#";
            for (let i = 0; i < 3; i++)
                color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
            return color;
        },
        deleteArticle(articleId) {
            console.log(`http://localhost:10000/articles/${articleId}`)
            axios.delete(`http://localhost:10000/articles/${articleId}`)
            .then(() => {
                store.dispatch('DELETE_ARTICLE', articleId);
            })
            .catch(error => {
            console.error(error);
            }); 
            this.$router.push('/');      
         }
    }, 
    watch: {
        published(newVal, oldVal)
        {
            console.log(`${newVal} ${oldVal}`);
        }
    },
    
    


};
</script>

<style>
.text-subtitle{
    font-size: 18px;
}
</style>



