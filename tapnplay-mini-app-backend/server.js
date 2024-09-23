const express = require('express');
const cors = require('cors');
const { Telegraf } = require('telegraf');
require('dotenv').config(); // Подключение dotenv для работы с переменными окружения

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN); // Используйте переменную окружения для токена

// Настройка CORS для разрешения запросов с вашего фронтенда
app.use(cors({
  origin: 'https://tapnplay.store' // Убедитесь, что слеш отсутствует
}));

// Объект для хранения информации о пользователях
const users = {};

// Обработчик команды /start
bot.start((ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username || 'Неизвестный пользователь';

  // Сохраняем информацию о пользователе
  users[userId] = { username };

  ctx.reply(`Привет, ${username}!`);
});

// Запускаем бота
bot.launch();

// Маршрут для получения никнейма пользователя
app.get('/api/username/:userId', (req, res) => {
  const userId = req.params.userId;

  // Проверяем, есть ли информация о пользователе
  if (users[userId]) {
    res.json({ username: users[userId].username });
  } else {
    res.status(404).json({ error: 'Пользователь не найден' });
  }
});

// Обработчик для инициализации приложения
app.get('/api/init', (req, res) => {
  const userId = req.query.userId; // Получаем userId из запроса

  if (!userId) {
    return res.status(400).json({ error: 'userId не указан' });
  }

  if (users[userId]) {
    res.json({ username: users[userId].username });
  } else {
    res.status(404).json({ error: 'Пользователь не найден' });
  }
});

// Запускаем сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
