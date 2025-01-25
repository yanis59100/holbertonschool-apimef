// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App)
  .use(router) // Ajoutez le router à l'application
  .mount('#app');
