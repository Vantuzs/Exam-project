const fs = require('fs')
const path = require('path')

module.exports = (err, req, res, next) => {
  console.log(err);
  const Log = {
    message: err.message || 'Server error',
    time: Date.now(),
    code: err.code || 500,
    stackTrace: {
      name: err.name,
      stack: err.stack,
      source: err.source
    }
  };
  const logLine = JSON.stringify(Log) + '\n';
  const logPath = path.join(__dirname,'error_log.jsonl');

  fs.appendFile(logPath,logLine,(err)=> err && console.log('Error log',err))

  if (err.message ===
    'new row for relation "Banks" violates check constraint "Banks_balance_ck"' ||
    err.message ===
    'new row for relation "Users" violates check constraint "Users_balance_ck"') {
    err.message = 'Not Enough money';
    err.code = 406;
  }
  if (!err.message || !err.code) {
    res.status(500).send('Server Error');
  } else {
    res.status(err.code).send(err.message);
  }
};