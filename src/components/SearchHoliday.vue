<!-- vite/my-project/my-project/src/components/SearchHoliday.vue -->
<template>
  <div class="container">
    <!-- Filter för länder -->
    <div>
      <h3>Filter Countries:</h3>
      <label v-for="(country, index) in filteredCountries" :key="country.countryCode">
        <input type="checkbox" v-model="selectedCountries" :value="country.countryCode" @change="fetchHolidays" />
        {{ country.name }}
      </label>
      <div id="selectResetAll">
        <button @click="selectAllCountries">Select All</button> <!-- Select All knapp -->
        <button @click="resetAllCountries">Reset All</button> <!-- Reset All knapp -->
        <label>
          <input type="checkbox" v-model="showLess" @change="toggleShowLess"> Show Less
        </label>
        <label>
          <input type="checkbox" v-model="showMore" @change="toggleShowMore"> Show More
        </label>
      </div>
    </div>

    <!-- Filter för år -->
    <div id="filterYear">
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
      <li v-if="filteredHolidays.length === 0 && selectedCountries.length > 0">No holidays to display. Please select
        countries to
        fetch holidays.</li>
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
      showLess: false, // Visa mindre flaggor
      showMore: false, // Visa fler flaggor
    };
  },
  computed: {
    filteredHolidays() {
      return this.holidays.filter(holiday =>
        holiday.name.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    },
    filteredCountries() {
      if (this.showLess) {
        return this.countries.slice(0, 5); // Visa de första 5 länderna om showLess är markerat
      } else if (this.showMore) {
        return this.countries; // Visa alla länder om showMore är markerat
      } else {
        return this.countries.slice(0, 10); // Visa de första 10 länderna som standard
      }
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
      if (this.selectedCountries.length === 0) {
        this.holidays = []; // Återställ holidays till tom array om inga länder är valda
        return;
      }
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
    resetAllCountries() {
      this.selectedCountries = [];
      this.fetchHolidays(); // Hämta helgdagar när inga länder är valda
    },
    // ser till om show less eller att show more är ikryssat
    toggleShowLess() {
      if (this.showLess) {
        this.showMore = false;
      }
    },
    toggleShowMore() {
      if (this.showMore) {
        this.showLess = false;
      }
    }
  },
};
</script>
