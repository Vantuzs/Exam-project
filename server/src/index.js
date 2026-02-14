require('dotenv').config();
const http = require('http');
// ============================
const express = require('express');
const path = require('path');
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
// app.use('/public', express.static(FILES_PATH));
app.use('/src/public/images', express.static(path.resolve(__dirname, 'public/images')));
app.use(router);
app.use(multerErrorHandler);
app.use(handlerError);

const server = http.createServer(app);
// server.listen(PORT, () =>
//   console.log(`Example app listening on port ${PORT}!`)
// );

const db = require('./models'); // шлях до твоїх моделей

// Замість просто app.listen, зроби так:
// db.sequelize.sync({ force: false }) // force: false не видалятиме дані, якщо вони з'являться
//   .then(() => {
//     server.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT} and DB is synced!`);
//     });
//   })
//   .catch(err => {
//     console.error('Unable to sync database:', err);
//   });

// controller.createConnection(server);

// --- ВСТАВИТИ ЗАМІСТЬ СТАРОГО db.sequelize.sync() ---

// --- ПОВНІСТЮ ГОТОВИЙ БЛОК ДЛЯ index.js ---

const SELECTS_DATA = [
  { type: 'typeOfName', describe: 'Company' },
  { type: 'typeOfName', describe: 'Product' },
  { type: 'typeOfName', describe: 'Project' },
  { type: 'nameStyle', describe: 'Classic' },
  { type: 'nameStyle', describe: 'Fun' },
  { type: 'nameStyle', describe: 'Professional' },
  { type: 'nameStyle', describe: 'Descriptive' },
  { type: 'nameStyle', describe: 'Youthful' },
  { type: 'nameStyle', describe: 'Any' },
  { type: 'typeOfTagline', describe: 'Classic' },
  { type: 'typeOfTagline', describe: 'Fun' },
  { type: 'typeOfTagline', describe: 'Powerful' },
  { type: 'typeOfTagline', describe: 'Descriptive' },
  { type: 'typeOfTagline', describe: 'Modern' },
  { type: 'typeOfTagline', describe: 'Any' },
  { type: 'brandStyle', describe: 'Techy' },
  { type: 'brandStyle', describe: 'Fun' },
  { type: 'brandStyle', describe: 'Fancy' },
  { type: 'brandStyle', describe: 'Minimal' },
  { type: 'brandStyle', describe: 'Brick & Mortar' },
  { type: 'brandStyle', describe: 'Photo-based' },
  { type: 'industry', describe: 'Creative Agency' },
  { type: 'industry', describe: 'Consulting Firm' },
  { type: 'industry', describe: 'Skin care' },
  { type: 'industry', describe: 'Biotech' },
  { type: 'industry', describe: 'Publisher' },
  { type: 'industry', describe: 'Education' },
  { type: 'industry', describe: 'Footwear' },
  { type: 'industry', describe: 'Medical' },
  { type: 'industry', describe: 'Builders' }
].map(item => ({ ...item, createdAt: new Date(), updatedAt: new Date() }));

const BANKS_DATA = [
  {
    cardNumber: '4564654564564564',
    name: 'SquadHelp',
    expiry: '11/26',
    cvc: '453',
    balance: 200000,
  },
  {
    cardNumber: '4111111111111111',
    name: 'yriy',
    expiry: '09/26',
    cvc: '505',
    balance: 5000,
  },
].map(item => ({ ...item, createdAt: new Date(), updatedAt: new Date() }));

db.sequelize.sync({ force: false })
  .then(async () => {
    try {
      // 1. Сидимо Selects
      const selectsCount = await db.Selects.count();
      if (selectsCount === 0) {
        console.log('--- Seeding Selects... ---');
        await db.Selects.bulkCreate(SELECTS_DATA);
        console.log('--- Selects seeded! ---');
      }

      // 2. Сидимо Banks
      const banksCount = await db.Banks.count();
      if (banksCount === 0) {
        console.log('--- Seeding Banks... ---');
        await db.Banks.bulkCreate(BANKS_DATA);
        console.log('--- Banks seeded! ---');
      }

    } catch (seedError) {
      console.error('--- Seeding Error:', seedError.message);
    }

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`--- Server is live on port ${PORT} ---`);
    });
  })
  .catch((err) => {
    console.error('--- DB Sync Error:', err);
  });

  controller.createConnection(server);

// ---------------------------------------------------

