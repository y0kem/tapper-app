// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import CoinTapper from '../components/CoinTapper.vue';
import Shop from '../components/Shop.vue';

const routes = [
  { path: '/', name: 'CoinTapper', component: CoinTapper },
  { path: '/shop', name: 'ShopComponent', component: Shop },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
