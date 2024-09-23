// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import CoinTapper from '../components/CoinTapper.vue';
import Shop from '../components/Shop.vue';
import Profile from '../components/UserProfile.vue';

const routes = [
  { path: '/', name: 'CoinTapper', component: CoinTapper },
  { path: '/shop', name: 'ShopComponent', component: Shop },
  { path: '/profile', name: 'Profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
