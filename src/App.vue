<template>
  <div id="app">
    <ArticleList msg="Big message"/>
    <div>
      <router-link to="/">Статьи</router-link> <br>
      <router-link to="/new">Добавить статью</router-link> <br>
      <!-- <router-link to="/articles">Статьи</router-link> <br> -->
      <router-link to="/about">ОПИСАНИЕ</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import ArticleList from './components/ArticleList.vue'


export default {
  name: 'App',
  components: {
    // ArticleList
  }
}
</script>

<style>
 @import './style.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
