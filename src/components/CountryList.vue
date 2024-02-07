<!-- vite/my-project/src/components/CountryList.vue -->
<!-- Komponent för lista över länder -->
<template>
  <div>
    <h2>Country List</h2>
    <ul>
      <li v-for="country in countries" :key="country.countryCode">
        <router-link :to="{ name: 'HolidayList', params: { countryCode: country.countryCode } }">
          {{ country.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      countries: [],
    };
  },
  mounted() {
    // Hämta lista över tillgängliga länder
    axios.get('https://date.nager.at/api/v3/AvailableCountries')
      .then(response => {
        this.countries = response.data;
      })
      .catch(error => {
        console.error('Error fetching country list:', error);
      });
  },
};
</script>
