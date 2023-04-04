<template>
  <v-app id="inspire">
    
    <v-app-bar
      app
      color="#E5F8BF"
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Журнал статей</v-toolbar-title>

      <v-spacer></v-spacer>

       <v-btn icon 
       x-large
       @click="dialog = true" 
       color="primary"
       >
        <v-icon  >mdi-plus-box-outline</v-icon>
      </v-btn> 
    </v-app-bar>
    
    <v-main app>
      <v-layout >
        <v-navigation-drawer
          expand-on-hover
          rail
        >
          <v-list>
            <v-list-item color="primary" :to="'/'">
              <v-icon>mdi-text-long</v-icon>
              <v-list-item-content>
                <v-list-item-title>Статьи</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item color="primary" :to="'/about'">
              <v-icon>mdi-information-outline</v-icon>
              <v-list-item-content>
                <v-list-item-title>О нас</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item color="primary" :to="'/new'">
              <v-icon>mdi-plus-box-outline</v-icon>
              <v-list-item-content>
                <v-list-item-title>Добавить статью</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          </v-list>
        </v-navigation-drawer>

        <v-layout justify-center>
          <router-view/>

          <v-dialog v-model="dialog" width="500"
          >
          <v-form>
        <v-card color="#F5F5F5">
            <v-container>
            <v-text-field
            v-model="article.title"
            :counter="50"
            label="Title"
            required
          ></v-text-field>

          <v-text-field
            v-model="article.author"
            label="Author"
            required
          ></v-text-field>

          <v-textarea
            v-model="article.body"
            auto-grow
            variant="filled"
            label="Body"
            rows="2"
            required
          ></v-textarea>

          <v-checkbox
            v-model="article.published"
            label="Опубликовать"
            type="checkbox"
            ></v-checkbox>
          <v-btn
            type="text"
            @click="addArticle(article); dialog = false;"
            color="#90EE90"
            variant="text"
            >
            Отправить
            </v-btn>
        </v-container>
        </v-card>
      </v-form>
    </v-dialog>
    
        </v-layout>
        
      </v-layout>
      
    </v-main>

    <v-footer color="#E5F8BF">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.name"
        :to="link.link"
        color="white"
        variant="text"
        class="mx-2"
      >
        {{ link.name }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
  </v-app>
</template>


<script>
import store from './store'
import axios from 'axios';
export default {
  name: 'App',
  props: {
        title: String,
        body: String,
        author: String,
        published: Boolean,
    },
  data() {
    return {
      article:{
                title: this.title,
                body: this.body,
                author: this.author,
                published: this.published
            }, 
            dialog: false,
            links: [
        {
          name: 'Статьи',
          link: '/'
        },
        {
          name: 'О нас',
          link: '/about'
        }
      ]
    }
  },
  methods: {
        addArticle: function(article){
            let newArticle = {
                id: store.state.articles.length+1,
                ...article
            }
            let data = {
            title: newArticle.title,
            author: newArticle.author,
            body: newArticle.body,
            published: newArticle.published
            };
            // Отправляем запрос POST на сервер с помощью Axios
        
        axios.post('http://localhost:10000/articles', data)
          .then(response => {
            console.log(response);
            store.commit('addArticle', newArticle);
            
          })
          .catch(error => {
            console.log(error);
          });
        this.$router.push('/');
        }
    }
};
</script>
