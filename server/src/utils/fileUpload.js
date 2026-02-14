const fs = require('fs');
const path = require('path');
const multer = require('multer');
const ServerError = require('../errors/ServerError');
const {FILES_PATH} = require('../constants')
const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(FILES_PATH,'images');

// const filePath = env === 'production'
//   ? '/var/www/html/images/'
//   : devFilePath;

// if (!fs.existsSync(filePath)) {
//   fs.mkdirSync(filePath, {
//     recursive: true,
//   });
// }

// Автоматично визначаємо корінь проекту

// На Render (production) використовуємо шлях усередині папки проекту
const filePath = env === 'production'
  ? path.resolve(__dirname, '../public/images') // Піднімись вище до папки public
  : devFilePath;

// Перевірка та створення папки (це у тебе вже добре зроблено)
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storageContestFiles = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, filePath);
  },
  filename (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});



const multerInstance = multer({ storage: storageContestFiles });

module.exports.uploadAvatar = multerInstance.single('file');

module.exports.uploadContestFiles = multerInstance.array('files',3);

module.exports.updateContestFile = multerInstance.single('file');

module.exports.uploadLogoFiles = multerInstance.single('offerData');
