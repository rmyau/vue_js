<template>
     <v-text-field

            v-model="article.title"
            :counter="50"
            label="Title"
            required
          ></v-text-field>
    

</template>

<script>

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
            console.log(`${this.$store.state.articles}`)
        return this.$store.state.articles.find(article => article.id === Number(this.id))
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



