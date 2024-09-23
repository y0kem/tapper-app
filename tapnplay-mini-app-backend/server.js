// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoints

/**
 * Получить количество монет пользователя
 * Метод: GET
 * Путь: /api/coins
 * Параметры: telegramId (через query)
 */
app.get('/api/coins', async (req, res) => {
  const { telegramId } = req.query;
  if (!telegramId) {
    return res.status(400).json({ error: 'Отсутствует telegramId' });
  }

  try {
    const [rows] = await pool.query('SELECT coins FROM users WHERE telegram_id = ?', [telegramId]);
    if (rows.length > 0) {
      res.json({ coins: rows[0].coins });
    } else {
      // Если пользователь не существует, создать запись с 0 монетами
      await pool.query('INSERT INTO users (telegram_id, coins) VALUES (?, ?)', [telegramId, 0]);
      res.json({ coins: 0 });
    }
  } catch (error) {
    console.error('Ошибка при получении монет:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

/**
 * Добавить монеты пользователю
 * Метод: POST
 * Путь: /api/coins
 * Тело запроса: { telegramId: Number, amount: Number }
 */
app.post('/api/coins', async (req, res) => {
  const { telegramId, amount } = req.body;
  if (!telegramId || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Неверные параметры запроса' });
  }

  try {
    const [rows] = await pool.query('SELECT coins FROM users WHERE telegram_id = ?', [telegramId]);
    if (rows.length > 0) {
      // Обновить количество монет
      await pool.query('UPDATE users SET coins = coins + ? WHERE telegram_id = ?', [amount, telegramId]);
      const [updatedRows] = await pool.query('SELECT coins FROM users WHERE telegram_id = ?', [telegramId]);
      res.json({ coins: updatedRows[0].coins });
    } else {
      // Создать нового пользователя с указанным количеством монет
      await pool.query('INSERT INTO users (telegram_id, coins) VALUES (?, ?)', [telegramId, amount]);
      res.json({ coins: amount });
    }
  } catch (error) {
    console.error('Ошибка при добавлении монет:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

/**
 * Покупка предмета
 * Метод: POST
 * Путь: /api/purchase
 * Тело запроса: { telegramId: Number, cost: Number }
 */
app.post('/api/purchase', async (req, res) => {
  const { telegramId, cost } = req.body;
  if (!telegramId || typeof cost !== 'number') {
    return res.status(400).json({ error: 'Неверные параметры запроса' });
  }

  try {
    const [rows] = await pool.query('SELECT coins FROM users WHERE telegram_id = ?', [telegramId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const currentCoins = rows[0].coins;
    if (currentCoins < cost) {
      return res.status(400).json({ error: 'Недостаточно монет для покупки' });
    }

    // Обновить количество монет
    await pool.query('UPDATE users SET coins = coins - ? WHERE telegram_id = ?', [cost, telegramId]);
    const [updatedRows] = await pool.query('SELECT coins FROM users WHERE telegram_id = ?', [telegramId]);
    res.json({ coins: updatedRows[0].coins });
  } catch (error) {
    console.error('Ошибка при покупке:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
