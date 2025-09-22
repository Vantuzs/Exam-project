

module.exports = (sequelize, DataTypes) => {
  const UsersToConversation = sequelize.define('UsersToConversations', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      primaryKey: true,
    },
    conversationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
          model: 'Conversations',
          key: 'id'
      },
        primaryKey: true,
    },
    blackList: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    favoriteList: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  {
    timestamps: true,
  });

  return UsersToConversation;
};
