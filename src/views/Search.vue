<!-- vite/my-project/my-project/src/views/Search.vue -->
<template>
  <div class="container">
    <h1>Search Page</h1>
    <div class="content">
      <SearchHoliday />
    </div>
  </div>
</template>

<script>
import SearchHoliday from '../components/SearchHoliday.vue';

export default {
  components: {
    SearchHoliday,
  },
};
</script>
