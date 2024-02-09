<!-- vite/my-project/my-project/src/components/HolidayDetails.vue -->
<template>
  <div class="container">
    <h1>Holiday - {{ holiday.localName }}</h1>
    <img :src="'https://flagsapi.com/' + countryCode + '/flat/64.png'" alt="Flag of the country">
    <p>Date: {{ holiday.date }}</p>
    <p>Celebrated in: {{ countryName }} ({{ holiday.countryCode }})</p>
    <p>English name: {{ holiday.name }}</p>
    <p>Type: {{ holiday.types }}*</p>
    <div>
      <p>The types of the public holiday, several possible:</p>
      <ul>
        <li>* Public</li>
        <li>* Bank (Bank holiday, banks and offices are closed)</li>
        <li>* School (School holiday, schools are closed)</li>
        <li>* Authorities (Authorities are closed)</li>
        <li>* Optional (Majority of people take a day off)</li>
        <li>* Observance (Optional festivity, no paid day off)</li>
      </ul>
      <router-link :to="{ name: 'holidays', params: { countryCode: holiday.countryCode } }">Go back</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    countryCode: String,
    date: String,
  },
  data() {
    return {
      holiday: {},
      countryName: '', // Lägg till fältet för countryName
    };
  },
  watch: {
    countryCode: 'fetchHolidayDetails',
    date: 'fetchHolidayDetails',
  },
  mounted() {
    this.fetchHolidayDetails();
  },
  methods: {
    fetchHolidayDetails() {
      axios
        .get(`https://date.nager.at/api/v3/publicholidays/${new Date().getFullYear()}/${this.countryCode}`)
        .then((response) => {
          // Filter holidays based on the date
          const holiday = response.data.find((h) => h.date === this.date);
          if (holiday) {
            this.holiday = holiday;
            this.fetchCountryName(); // Hämta landets namn när holiday är satt
          } else {
            console.error('Holiday not found for the specified date.');
          }
        })
        .catch((error) => {
          console.error('Error fetching holiday details:', error);
        });
    },
    fetchCountryName() {
      axios.get(`https://restcountries.com/v3/alpha/${this.countryCode}`)
        .then(response => {
          this.countryName = response.data[0]?.name?.common || '';
        })
        .catch(error => {
          console.error('Error fetching country name:', error);
        });
    },
  },
};
</script>
