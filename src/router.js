// vite/my-project/my-project/src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import CountryList from './components/CountryList.vue';
import HolidayList from './components/HolidayList.vue';
import HolidayDetails from './components/HolidayDetails.vue';
import About from './views/About.vue';
import Search from './views/Search.vue';

const routes = [
  { path: '/', component: CountryList, name: 'CountryList' },
  { path: '/holidays/:countryCode', name: 'HolidayList', component: HolidayList },
  { path: '/holiday/:countryCode/:date', name: 'HolidayDetails', component: HolidayDetails },
  { path: '/about', name: 'About', component: About },
  { path: '/search', name: 'Search', component: Search },
  {
    path: '/holidays/:countryCode/:date',
    name: 'HolidayDetails',
    component: HolidayDetails,
    props: true,
  },
  {
    path: '/holidays/:countryCode', // Ange landskoden som dynamisk parameter
    name: 'holidays',
    component: HolidayList,
  },
  { path: '/search', name: 'Search', component: Search }, // Lägg till denna rad igen om den saknas
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
