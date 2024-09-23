<template>
  <div class="coin-tapper">
    <h2>Монеты: {{ coins }}</h2>
    <button @click="tapCoin" class="coin-button">💰 Тапни меня!</button>
  </div>
</template>

<script>
import { inject, onMounted, onUnmounted } from 'vue';

export default {
  name: 'CoinTapper',
  setup() {
    const coins = inject('coins');
    let isTapping = false; 
    let coinInterval;

    const tapCoin = () => {
      if (isTapping) return;
      isTapping = true; 
      coins.value += 1; 

      setTimeout(() => {
        isTapping = false;
      }, 300);
    };

    const addCoins = () => {
      coins.value += 1; // Добавляем монету раз в секунду
    };

    onMounted(() => {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
      }
      coinInterval = setInterval(addCoins, 1000); // Запускаем интервал
    });

    onUnmounted(() => {
      clearInterval(coinInterval); // Очищаем интервал при размонтировании
    });

    return {
      coins,
      tapCoin,
    };
  },
};
</script>

<style scoped>
.coin-tapper {
  text-align: center;
  margin-top: 50px;
}
.coin-button {
  font-size: 2rem;
  padding: 20px;
  cursor: pointer;
}
</style>
