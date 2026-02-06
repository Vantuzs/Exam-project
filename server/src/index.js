require('dotenv').config();
const http = require('http');
// ============================
const express = require('express');
const cors = require('cors');
// require('./dbMongo/mongoose');
const router = require('./router');
const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');
const multerErrorHandler = require('./handlerError/multerHandler');
const {FILES_PATH} = require('./constants');
const { RotationTimer } = require('./handlerError/ErrorLogHandler');

const PORT = process.env.PORT || 5000;
const app = express();

RotationTimer()
app.use(cors({
  origin: 'https://exam-project-3223.onrender.com', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200 // Додай це для кращої сумісності
}));
app.use(express.json());
app.use('/public', express.static(FILES_PATH));
app.use(router);
app.use(multerErrorHandler);
app.use(handlerError);

const server = http.createServer(app);
// server.listen(PORT, () =>
//   console.log(`Example app listening on port ${PORT}!`)
// );

const db = require('./models'); // шлях до твоїх моделей

// Замість просто app.listen, зроби так:
db.sequelize.sync({ force: false }) // force: false не видалятиме дані, якщо вони з'являться
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} and DB is synced!`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

controller.createConnection(server);
