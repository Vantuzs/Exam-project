

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    sender: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    body: {
        allowNull: false,
        type: DataTypes.STRING
    },
     conversationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Conversations',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  });

  return Message;
};
