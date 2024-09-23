<template>
  <div>
    <h2>User Profile</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <p>Никнейм: {{ username }}</p>
    </div>
  </div>
</template>

<script>
import { getUsernameById } from '@/services/userService';

export default {
  name: 'UserProfile',
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      username: '',
      loading: false,
      error: '',
    };
  },
  created() {
    this.fetchUsername(); // Вызываем fetchUsername в момент создания компонента
  },
  methods: {
    async fetchUsername() {
      this.loading = true;
      this.error = '';
      const userId = window.Telegram.WebApp.initDataUnsafe.user.id; // Получаем userId из Telegram Web App

      try {
        this.username = await getUsernameById(userId); // Получаем никнейм по userId
      } catch (err) {
        this.error = 'Не удалось загрузить никнейм пользователя.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Добавьте стили по необходимости */
</style>
