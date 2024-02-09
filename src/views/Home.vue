<!-- vite/my-project/my-project/src/views/Home.vue -->
<template>
  <div class="container">
    <h1>Home Page</h1>
    <div class="content">
      <CountryList />
      <router-link to="/about">Go to About Page</router-link>
    </div>
  </div>
</template>

<script>
import CountryList from '../components/CountryList.vue';

export default {
  components: {
    CountryList,
  },
};
</script>
