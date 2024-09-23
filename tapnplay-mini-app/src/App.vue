<template>
  <div id="app">
    <nav>
      <router-link to="/">Кликать монеты</router-link>
      |
      <router-link to="/shop">Магазин</router-link>
      <button @click="toggleTheme">Сменить тему</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { ref, provide, onMounted, watch } from 'vue';

export default {
  name: 'App',
  setup() {
    const coins = ref(0);
    provide('coins', coins);

    onMounted(() => {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        const savedCoins = localStorage.getItem('coins');
        if (savedCoins) {
          coins.value = parseInt(savedCoins, 10);
        }
      }
    });

    watch(coins, (newCoins) => {
      localStorage.setItem('coins', newCoins);
    });

    const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    };

    return {
      toggleTheme,
    };
  },
};
</script>

<style>
nav {
  padding: 10px;
  background-color: var(--background-color);
  text-align: center;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: var(--text-color);
}

:root {
  --background-color: #ffffff; /* Светлая тема */
  --text-color: #000000;
}

[data-theme='dark'] {
  --background-color: #1e1e1e; /* Темная тема */
  --text-color: #ffffff;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.coin-button {
  background-color: var(--text-color);
  color: var(--background-color);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.3s, color 0.3s;
}

.coin-button:hover {
  opacity: 0.8;
}
</style>
