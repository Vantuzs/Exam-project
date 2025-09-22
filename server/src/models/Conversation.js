

module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: true,
  });

  return Conversation;
};
