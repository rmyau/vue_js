<template>
    <v-form>
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
            v-on:click.prevent="$emit('addArticle',article)"
            >
            Отправить
            </v-btn>
        </v-container>
    </v-form>
    <!-- <div>
        <h2>Добавить статью</h2>
        <form style="text-align: center">
            <div><input type="text" v-model="article.title" placeholder="Title"></div>
            <div><input type="text" v-model="article.author" placeholder="Author"></div>
            <div><textarea v-model="article.body" placeholder="Body"></textarea></div>
            <div><label><input type="checkbox" v-model="article.published">Published</label></div>
            <div><input type="submit" value="Add" v-on:click.prevent="$emit('addArticle',article)"></div>
        </form>
    </div> -->
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
            }
        }
    }
};
</script>