<template>
  <div class="shop">
    <h2>Магазин</h2>
    <p>У вас {{ coins }} монет.</p>
    <button @click="buyItem" class="shop-button">Купить предмет за 5 монет</button>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'ShopComponent',
  setup() {
    const coins = inject('coins');

    const buyItem = () => {
      if (coins.value >= 5) {
        coins.value -= 5; // Снижаем монеты на 5
        alert('Вы купили предмет!');
      } else {
        alert('Недостаточно монет для покупки!');
      }
    };

    return {
      coins,
      buyItem,
    };
  },
};
</script>

<style scoped>
.shop {
  text-align: center;
  margin-top: 50px;
}
.shop-button {
  font-size: 1.5rem;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
