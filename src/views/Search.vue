<!-- vite/my-project/my-project/src/views/Search.vue -->
<template>
  <div class="container">
    <h1>Search Page</h1>
    <div class="content">

      <!-- custom event -->
      <SearchHoliday @customEventName="handleCustomEvent" />

    </div>
  </div>
</template>

<script>
import SearchHoliday from '../components/SearchHoliday.vue';

export default {
  components: {
    SearchHoliday,
  },
  methods: {
    handleCustomEvent(extraInformation) {
      console.log('Custom event taken to Serach.vue and some extra info:', extraInformation);
    }
  }
};
</script>
