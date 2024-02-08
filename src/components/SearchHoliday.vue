<!-- vite/my-project/my-project/src/components/SearchHoliday.vue -->
<template>
  <div class="container">
    <!-- Filter för länder -->
    <div>
      <h3>Filter Countries:</h3>
      <label v-for="country in countries" :key="country.countryCode">
        <input type="checkbox" v-model="selectedCountries" :value="country.countryCode" @change="fetchHolidays" />
        {{ country.name }}
      </label>
      <button @click="selectAllCountries">Select All</button> <!-- Select All knapp -->
      <button @click="deselectAllCountries">Deselect All</button> <!-- Deselect All knapp -->
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
        <router-link :to="{ name: 'HolidayDetails', params: { countryCode: holiday.countryCode, date: holiday.date } }">
          ({{ holiday.countryCode }}) {{ holiday.name }} ({{ holiday.localName }}) - {{ holiday.date }}
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
      countries: [], // Alla tillgängliga länder
      selectedCountries: [], // Valda länder
      availableYears: [], // Alla tillgängliga år
      selectedYear: new Date().getFullYear(), // Valt år
      holidays: [], // Alla helgdagar
      searchInput: '', // Användarens sökning
    };
  },
  computed: {
    filteredHolidays() {
      return this.holidays.filter(holiday =>
        holiday.name.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    }
  },
  async mounted() {
    // Hämta tillgängliga länder
    try {
      const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
      this.countries = response.data;
    } catch (error) {
      console.error('Error fetching available countries:', error);
    }

    // Hämta tillgängliga år alternativ, 24-29
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
          this.holidays.push(...response.data.map(holiday => ({ ...holiday, countryCode })));
        } catch (error) {
          console.error(`Error fetching holidays for country ${countryCode}:`, error);
        }
      }
    },
    selectAllCountries() {
      this.selectedCountries = this.countries.map(country => country.countryCode);
      this.fetchHolidays(); // Hämta helgdagar när alla länder är valda
    },
    deselectAllCountries() {
      this.selectedCountries = [];
      this.fetchHolidays(); // Hämta helgdagar när inga länder är valda
    }
  },
};
</script>
