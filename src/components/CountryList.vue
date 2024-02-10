<!-- vite/my-project/src/components/CountryList.vue -->
<!-- Komponent för lista över länder -->
<template>
  <div class="container">
    <h1>Home Page</h1>
    <h2>Country List</h2>
    <ul class="country-grid">
      <li v-for="country in countries" :key="country.countryCode">
        <router-link :to="{ name: 'HolidayList', params: { countryCode: country.countryCode } }">
          <div class="flags">
            <img :src="'https://flagsapi.com/' + country.countryCode + '/flat/24.png'" alt="Flag of the country">
            {{ country.name }}
          </div>
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

<style scoped>
.country-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  /* Avstånd mellan kolumner och rader */
}

.country-grid li {
  text-align: center;
}

.flags img {
  max-width: 100%;
  height: auto;
}
</style>
