import Vue from 'vue';
import Router from 'vue-router';
import Accueil from '../components/Accueil.vue';
import Login from '../components/Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil,
    },
    {
      path: '/connexion',
      name: 'Connexion',
      component: Login,
    },
  ],
});
