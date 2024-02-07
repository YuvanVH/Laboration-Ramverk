<!-- vite/my-project/my-project/src/components/SearchHoliday.vue -->
<template>
  <div>
    <h2>Search for a Holiday</h2>
    <input v-model="searchInput" placeholder="Enter holiday name" />
    <button @click="searchHoliday">Search</button>

    <div v-if="filteredResults.length === 0">
      <p>No results found.</p>
    </div>

    <div v-else>
      <h3>Search Results</h3>
      <ul>
        <li v-for="result in filteredResults" :key="result.date">
          <router-link :to="{ name: 'HolidayDetails', params: { countryCode: result.countryCode, date: result.date } }">
            {{ result.name }} - {{ result.date }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const apiUrl = 'https://date.nager.at/api/v3/publicholidays';

export default {
  data() {
    return {
      searchInput: '',
      searchResults: [],
      year: new Date().getFullYear(),
      countryCode: 'EN',
    };
  },
  computed: {
    filteredResults() {
      return this.searchResults.filter(holiday =>
        holiday.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        holiday.localName.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    },
  },
  methods: {
    async searchHoliday() {
      try {
        const response = await axios.get(`${apiUrl}/${this.year}/${this.countryCode}`);
        console.log('API Response:', response);
        this.searchResults = response.data;
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    },
  },
  watch: {
    '$route.params.countryCode'(newCountryCode) {
      this.countryCode = newCountryCode;
      this.searchResults = [];
      this.searchHoliday();
    },
  },
  mounted() {
    this.searchHoliday();
  },
};
</script>
