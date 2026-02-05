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
  origin: 'https://exam-project-1123.onrender.com', // Твій URL фронтенда на Render
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use('/public', express.static(FILES_PATH));
app.use(router);
app.use(multerErrorHandler);
app.use(handlerError);

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
controller.createConnection(server);
