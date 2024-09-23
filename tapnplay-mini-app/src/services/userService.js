// src/services/userService.js

import apiClient from './api';

export const getUsernameById = async (userId) => {
  try {
    // Измените путь на правильный для получения никнейма
    const response = await apiClient.get(`/init?userId=${userId}`);
    return response.data.username;
  } catch (error) {
    console.error(`Ошибка при получении никнейма пользователя с ID ${userId}:`, error);
    throw new Error('Не удалось получить никнейм пользователя. Пожалуйста, попробуйте позже.');
  }
};
