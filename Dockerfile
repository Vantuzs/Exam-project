# 1. Беремо готовий образ з встановленим Node.js
FROM node:18-alpine

# 2. Створюємо папку додатка
WORKDIR /app

# 3. Копіюємо файли залежностей (це прискорює білд)
COPY package*.json ./

# 4. Встановлюємо бібліотеки
RUN npm install --production

# 5. Копіюємо весь інший код
COPY . .

# 6. Вказуємо порт, який ми прописали в .env
EXPOSE 5000

# 7. Запускаємо сервер (використовуємо npm start для production)
CMD ["npm", "start"]