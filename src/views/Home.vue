<!-- vite/my-project/my-project/src/views/Home.vue -->
<template>
  <div>
    <h1>Home Page</h1>
    <CountryList />
    <router-link to="/about">Go to About Page</router-link>
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
