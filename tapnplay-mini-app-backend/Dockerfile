# Указываем базовый образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем все остальные файлы
COPY . .

# Указываем порт (например, 5000)
EXPOSE 5000

# Запускаем приложение
CMD ["node", "server.js"]
