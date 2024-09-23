# Указываем базовый образ
FROM node:18

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем все остальные файлы
COPY . .

# Запускаем приложение
CMD ["node", "server.js"]
