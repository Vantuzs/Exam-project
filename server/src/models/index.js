const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath =
  env === 'production'
    ? path.join(
        __dirname,
        '..',
        '..',
        '..',
        'src/server/config/postgresConfig.json'
      )
    : path.join(__dirname, '..', '/config/postgresConfig.json');
const config = require('../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  // На Render: використовуємо DATABASE_URL + додаємо обов'язкові опції
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    dialect: 'postgres', // Явно вказуємо діалект
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Це дозволить підключитися до сертифікатів Render
      }
    }
  });
} else {
  // Локально (Docker)
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db['Contests'].belongsTo(db['Users'], {
  foreignKey: 'userId',
  sourceKey: 'id',
});
db['Contests'].hasMany(db['Offers'], {
  foreignKey: 'contestId',
  targetKey: 'id',
});

db['Users'].hasMany(db['Offers'], { foreignKey: 'userId', targetKey: 'id' });
db['Users'].hasMany(db['Contests'], { foreignKey: 'userId', targetKey: 'id' });
db['Users'].hasMany(db['Ratings'], { foreignKey: 'userId', targetKey: 'id' });

db['Offers'].belongsTo(db['Users'], { foreignKey: 'userId', sourceKey: 'id' });
db['Offers'].belongsTo(db['Contests'], {
  foreignKey: 'contestId',
  sourceKey: 'id',
});
db['Offers'].hasOne(db['Ratings'], { foreignKey: 'offerId', targetKey: 'id' });

db['Ratings'].belongsTo(db['Users'], { foreignKey: 'userId', targetKey: 'id' });
db['Ratings'].belongsTo(db['Offers'], {
  foreignKey: 'offerId',
  targetKey: 'id',
});

// Conversations
db['Conversations'].hasMany(db['Messages'], {
  foreignKey: 'conversationId',
  targetKey: 'id',
});
db['Messages'].belongsTo(db['Conversations'], {
  foreignKey: 'conversationId',
  sourceKey: 'id',
});

// Conversations-UsersToConversations
db['Conversations'].hasMany(db['UsersToConversations'], {
  foreignKey: 'conversationId',
  as: 'participants',
});
db['UsersToConversations'].belongsTo(db['Conversations'], {
  foreignKey: 'conversationId',
  as: 'conversation',
});

// Users-UsersToCOnversations
db['Users'].hasMany(db['UsersToConversations'], {
  foreignKey: 'userId',
  as: 'userConversations',
});
db['UsersToConversations'].belongsTo(db['Users'], {
  foreignKey: 'userId',
  as: 'user',
});

// Users-Conversations
db['Users'].belongsToMany(db['Conversations'], {
  through: db['UsersToConversations'],
  foreignKey: 'userId',
});
db['Conversations'].belongsToMany(db['Users'], {
  through: db['UsersToConversations'],
  foreignKey: 'conversationId',
});

// Messages
db['Messages'].belongsTo(db['Users'], {
  foreignKey: 'sender',
  targetKey: 'id',
});
db['Users'].hasMany(db['Messages'], { foreignKey: 'sender', sourceKey: 'id' });

// Catalogs
db['Catalogs'].belongsTo(db['Users'], {
  foreignKey: 'userId',
  sourceKey: 'id',
});
db['Users'].hasMany(db['Catalogs'], { foreignKey: 'userId', sourceKey: 'id' });

// Catalogs-CatalogsToConversations
db['Catalogs'].hasMany(db['CatalogsToConversations'], {
  foreignKey: 'catalogId',
  as: 'conversationLinks',
});
db['CatalogsToConversations'].belongsTo(db['Catalogs'], {
  foreignKey: 'catalogId',
  as: 'catalog',
});

// Conversations-CatalogsToConversations
db['Conversations'].hasMany(db['CatalogsToConversations'], {
  foreignKey: 'conversationId',
  as: 'catalogLinks',
});
db['CatalogsToConversations'].belongsTo(db['Conversations'], {
  foreignKey: 'conversationId',
  as: 'conversation',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
