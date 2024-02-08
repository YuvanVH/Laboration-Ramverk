<!-- vite/my-project/my-project/src/components/HolidayList.vue -->
<template>
  <div class="container">
    <h2>Holidays in {{ countryName }} ({{ countryCode }})</h2>
    <ul>
      <li v-for="holiday in holidays" :key="holiday.date">
        <router-link :to="{ name: 'HolidayDetails', params: { countryCode: countryCode, date: holiday.date } }">
          {{ holiday.localName }} - {{ holiday.date }}
        </router-link>
      </li>
    </ul>
    <div>
      <router-link :to="{ name: 'CountryList' }">Go back</router-link>
    </div>
  </div>
  <footer class="footer">
    <div class="footerContainer">
      <p>Copyright © GlobalHolidayTracker</p>
    </div>
  </footer>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      countryCode: this.$route.params.countryCode,
      countryName: '',
      holidays: [],
    };
  },
  watch: {
    '$route.params.countryCode'(newCountryCode) {
      this.countryCode = newCountryCode;
      this.fetchCountryName();
      this.fetchHolidays();
    },
  },
  mounted() {
    this.fetchCountryName();
    this.fetchHolidays();
  },
  methods: {
    fetchCountryName() {
      axios.get(`https://restcountries.com/v3/alpha/${this.countryCode}`)
        .then(response => {
          this.countryName = response.data[0]?.name?.common || '';
        })
        .catch(error => {
          console.error('Error fetching country name:', error);
        });
    },
    fetchHolidays() {
      axios.get(`https://date.nager.at/api/v3/publicholidays/2024/${this.countryCode}`)
        .then(response => {
          this.holidays = response.data;
        })
        .catch(error => {
          console.error('Error fetching holidays:', error);
        });
    },
  },
};
</script>
