// vite/my-project/my-project/src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './Router';
import './style.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
