<!-- vite/my-project/my-project/src/components/SearchHoliday.vue -->
<template>
  <div>
    <!-- Filter för länder -->
    <div>
      <h3>Filter Countries:</h3>
      <label v-for="country in countries" :key="country.countryCode">
        <input type="checkbox" v-model="selectedCountries" :value="country.countryCode" @change="fetchHolidays" />
        {{ country.name }}
      </label>
    </div>

    <!-- Filter för år -->
    <div>
      <h3>Filter Year:</h3>
      <select v-model="selectedYear" @change="fetchHolidays">
        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>

    <!-- Sökfält för att filtrera helgdagar baserat på namn -->
    <input v-model="searchInput" placeholder="Sök efter helgdag..." />

    <!-- Lista med resultat -->
    <ul>
      <li v-for="holiday in filteredHolidays" :key="holiday.date">
        ({{ countryCode }}) {{ holiday.name }} ({{ holiday.localName }}) - {{ holiday.date }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      countries: [], // Alla tillgängliga länder
      selectedCountries: [], // Valda länder
      availableYears: [], // Alla tillgängliga år
      selectedYear: new Date().getFullYear(), // Valt år
      holidays: [], // Alla helgdagar
      filteredHolidays: [], // Filtrerade helgdagar
      searchInput: '', // Användarens sökning
    };
  },
  async mounted() {
    // Hämta tillgängliga länder
    try {
      const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
      this.countries = response.data;
    } catch (error) {
      console.error('Error fetching available countries:', error);
    }

    // Hämta tillgängliga år
    this.availableYears = Array.from({ length: 6 }, (_, index) => new Date().getFullYear() + index);

    // Lyssna på ändringar i valda länder och år samt sökning och filtrera helgdagar
    this.$watch(
      () => [this.selectedCountries, this.selectedYear, this.searchInput],
      () => {
        this.fetchHolidays();
      },
      { deep: true }
    );
  },
  methods: {
    async fetchHolidays() {
      this.holidays = [];
      for (const countryCode of this.selectedCountries) {
        try {
          const response = await axios.get(`https://date.nager.at/api/v3/publicholidays/${this.selectedYear}/${countryCode}`);
          this.holidays.push(...response.data);
        } catch (error) {
          console.error(`Error fetching holidays for country ${countryCode}:`, error);
        }
      }
      this.filterHolidays();
    },
    filterHolidays() {
      // Filtrera helgdagar baserat på sökning
      this.filteredHolidays = this.holidays.filter(holiday =>
        holiday.name.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    },
  },
};
</script>
