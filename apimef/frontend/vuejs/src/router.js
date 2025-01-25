// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';

Vue.use(Router);

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
];

export default new Router({
  routes
});
