# Указываем базовый образ
FROM node:alpine as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json
COPY package.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы
COPY . .

# Собираем проект
RUN npm run build

# Используем nginx для обслуживания статических файлов
FROM nginx:stable-alpine

# Копируем скомпилированные файлы в nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем nginx.conf из локальной директории в контейнер
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Указываем порт
EXPOSE 3000

# Запускаем nginx
CMD [ "nginx", "-g", "daemon off;" ]
