<template>
    <v-dialog v-model="dialog" width="">
        <v-card>
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
            type="submit"
            @click="dialog = false"
            v-on:click.prevent="$emit('addArticle',article)"
            >
            Отправить
            </v-btn>
        </v-container>
        </v-card>
      
    
    </v-dialog>
    
    
</template>

<script>
export default {
    name: "ArticleForm",
    props: {
        title: String,
        body: String,
        author: String,
        published: Boolean,
    },
    data(){
        return{
            article:{
                title: this.title,
                body: this.body,
                author: this.author,
                published: this.published
            }, 
            dialog: true
        }
    }
};
</script>