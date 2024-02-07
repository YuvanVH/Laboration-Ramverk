<!-- vite/my-project/my-project/src/App.vue -->
<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/search">Search</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './views/Home.vue';
import About from './views/About.vue';
import Search from './views/Search.vue';

export default {
  components: {
    Home,
    About,
    Search,
  },
};
</script>
