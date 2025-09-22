

module.exports = (sequelize, DataTypes) => {
  const CatalogToConversation = sequelize.define('CatalogsToConversations', {
    catalogId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Catalogs',
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
  },
  {
    timestamps: true,
  });

  return CatalogToConversation;
};
