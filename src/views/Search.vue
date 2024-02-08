<!-- vite/my-project/my-project/src/views/Search.vue -->
<template>
  <div class="container">
    <h1>Search Page</h1>
    <SearchHoliday />
  </div>
  <footer class="footer">
    <div class="footerContainer">
      <p>Copyright © GlobalHolidayTracker</p>
    </div>
  </footer>
</template>

<script>
import SearchHoliday from '../components/SearchHoliday.vue';

export default {
  components: {
    SearchHoliday,
  },
};
</script>
