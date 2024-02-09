<!-- ..src/App.vue -->
<!-- App.vue -->
<template>
  <div class="containerMeny">
    <router-link class="menyItem" to="/">Home</router-link>
    <router-link class="menyItem" to="/about">About</router-link>
    <router-link class="menyItem" to="/search">Search</router-link>
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
