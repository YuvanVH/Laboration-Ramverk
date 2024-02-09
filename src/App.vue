<!-- ..src/App.vue -->
<template>
  <div id="navBar">
    <div id="imgHomePage">
      <router-link to="/" class="home-link">
        <img src="./assets/GlobalHolidayTracker-Logo.png" alt="GlobalHolidayTracker Logo">
      </router-link>
    </div>
  </div>
  <div class="containerMeny">
    <div class="itemInMeny">
      <router-link class="menyItem" to="/">Home</router-link>
      <router-link class="menyItem" to="/about">About</router-link>
      <router-link class="menyItem" to="/search">Search</router-link>
    </div>
  </div>
  <ScrollToTopButton />
  <h1 id="theTitle">GlobalHolidayTracker</h1>
  <p id="slogan">"Explore. Discover. Experience. Your journey starts here with GlobalHolidayTracker!"</p>
  <router-view></router-view>
  <footer class="footer">
    <div class="footerContainer">
      <p>Copyright © GlobalHolidayTracker</p>
    </div>
  </footer>
</template>

<script>
import Home from './views/Home.vue';
import About from './views/About.vue';
import Search from './views/Search.vue';
import ScrollToTopButton from './components/ScrollToTopButton.vue';

export default {
  components: {
    Home,
    About,
    Search,
    ScrollToTopButton
  },
};
</script>
