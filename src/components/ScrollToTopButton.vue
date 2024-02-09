<!-- scr/components/ScrollToTopButton.vue -->
<template>
  <button v-if="showButton" @click="scrollToTop" class="scroll-to-top">Scroll to Top</button>
</template>

<script>
export default {
  data() {
    return {
      showButton: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Visa knappen när användaren scrollar ner mer än 300 pixlar från toppen
      this.showButton = window.pageYOffset > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>
