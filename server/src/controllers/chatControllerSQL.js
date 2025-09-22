const db = require('../models');
const ServerError = require('../errors/ServerError');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient].sort(
    (a, b) => a - b
  );

  try {
    let [conversation] = await db.sequelize.query(
      `
  SELECT c.*
  FROM "Conversations" c
  JOIN "UsersToConversations" u
    ON c.id = u."conversationId"
  WHERE u."userId" IN (:participants)
  GROUP BY c.id
  HAVING COUNT(DISTINCT u."userId") = :count
  LIMIT 1
  `,
      {
        replacements: { participants, count: participants.length },
        type: db.Sequelize.QueryTypes.SELECT,
      }
    );

    if (!conversation) {
      conversation = await db.Conversations.create();

      await Promise.all(
        participants.map((userId) =>
          db.UsersToConversations.create({
            userId,
            conversationId: conversation.id,
          })
        )
      );
    }

    let message = await db.Messages.create({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversationId: conversation.id,
    });
    message = message.toJSON();
    message.participants = participants;

    const participantsData = await db.UsersToConversations.findAll({
      where: { conversationId: conversation.id },
    });

    const preview = {
      id: conversation.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createdAt: message.createdAt,
      participants,
      blackList: participantsData.map((p) => p.blackList),
      favoriteList: participantsData.map((p) => p.favoriteList),
    };

    res.send({
      message,
      preview: Object.assign(preview, {
        interlocutor: req.body.interlocutor,
        sigma: participantsData,
      }),
    });

    const interlocutorId = participants.find((p) => p !== req.tokenData.userId);

    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        ...preview,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.interlocutorId];

  try {
    const [conversation] = await db.sequelize.query(
      `
  SELECT c.*
  FROM "Conversations" c
  JOIN "UsersToConversations" u
    ON c.id = u."conversationId"
  WHERE u."userId" IN (:participants)
  GROUP BY c.id
  HAVING COUNT(DISTINCT u."userId") = :count
  LIMIT 1
  `,
      {
        replacements: { participants, count: participants.length },
        type: db.Sequelize.QueryTypes.SELECT,
      }
    );
    if (!conversation) return res.send({ message: [], interlocutor: null });

    const messages = conversation
      ? await db.Messages.findAll({
          where: { conversationId: conversation.id },
          order: [['createdAt', 'ASC']],
        })
      : [];

    const interlocutor = await userQueries.findUser({
      id: req.body.interlocutorId,
    });

    res.send({
      conversationId: conversation.id,
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const conversationOneUser = await db.UsersToConversations.findAll({
      where: { userId: req.tokenData.userId },
    });

    const conversation = await Promise.all(
      conversationOneUser.map(
        async (i) =>
          await db.UsersToConversations.findAll({
            where: { conversationId: i.dataValues.conversationId },
          })
      )
    );

    if (!conversation || conversation.length === 0) return res.send([]);

    const message = await Promise.all(
      conversationOneUser.map(
        async (i) =>
          await db.Messages.findOne({
            where: { conversationId: i.dataValues.conversationId },
            order: [['createdAt', 'DESC']],
            limit: 1,
          })
      )
    );

    const interlocurorId = conversation
      .flat()
      .map((i) => i.dataValues.userId)
      .filter((id) => id != req.tokenData.userId);

    const interlocutors = await db.Users.findAll({
      where: { id: interlocurorId },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });

    const sends = conversation.map((particantsArr, index) => {
      const participantSort = particantsArr
        .map((i) => ({
          userId: i.dataValues.userId,
          blackList: i.dataValues.blackList,
          favoriteList: i.dataValues.favoriteList,
          conversationId: i.dataValues.conversationId,
        }))
        .sort((a, b) => a.userId - b.userId);

      return {
        id: participantSort[0].conversationId,
        sender: message[index].dataValues.sender,
        text: message[index].dataValues.body,
        createdAt: message[index].dataValues.createdAt,
        participants: participantSort.map((i) => i.userId),
        blackList: participantSort.map((i) => i.blackList),
        favoriteList: participantSort.map((i) => i.favoriteList),
        interlocutor: interlocutors.find(
          (elem) =>
            participantSort.some((p) => p.userId === elem.id) &&
            elem.id !== req.tokenData.userId
        ),
      };
    });

    res.send(sends);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  try {
    const [, [chat]] = await db.UsersToConversations.update(
      {
        blackList: req.body.blackListFlag,
      },
      {
        where: {
          userId: req.tokenData.userId,
          conversationId: req.body.conversationId,
        },
        returning: true,
      }
    );
    if (!chat) throw new ServerError(404, '404 chat not found');

    const [interlocurorId] = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId
    );

    const participant = await db.UsersToConversations.findAll({
      where: {
        conversationId: req.body.conversationId,
      },
    });
    const participantFilter = participant
      .map(({ dataValues }) => {
        return {
          userId: dataValues.userId,
          blackList: dataValues.blackList,
          favoriteList: dataValues.favoriteList,
        };
      })
      .sort((a, b) => a.userId - b.userId);

    const resChat = {
      id: req.body.conversationId,
      participants: participantFilter.map((i) => i.userId),
      blackList: participantFilter.map((i) => i.blackList),
      favoriteList: participantFilter.map((i) => i.favoriteList),
    };
    res.send({ resChat, interlocurorId });

    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId
    );
    controller
      .getChatController()
      .emitChangeBlockStatus(interlocutorId, resChat);
  } catch (err) {
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const [, [chat]] = await db.UsersToConversations.update(
      {
        favoriteList: req.body.favoriteFlag,
      },
      {
        where: {
          userId: req.tokenData.userId,
          conversationId: req.body.conversationId,
        },
        returning: true,
      }
    );

    const participant = await db.UsersToConversations.findAll({
      where: {
        conversationId: req.body.conversationId,
      },
    });
    const participantFilter = participant
      .map(({ dataValues }) => {
        return {
          userId: dataValues.userId,
          blackList: dataValues.blackList,
          favoriteList: dataValues.favoriteList,
        };
      })
      .sort((a, b) => a.userId - b.userId);

    if (!chat) throw new ServerError(404, '404 chat not found');

    res.send({
      id: req.body.conversationId,
      participants: participantFilter.map((i) => i.userId),
      blackList: participantFilter.map((i) => i.blackList),
      favoriteList: participantFilter.map((i) => i.favoriteList),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const newCatalog = await db.Catalogs.create({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
    });

    await db.CatalogsToConversations.create({
      catalogId: newCatalog.id,
      conversationId: req.body.chatId,
    });

    res.send({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
      chats: [req.body.chatId],
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const [, [catalog]] = await db.Catalogs.update(
      {
        catalogName: req.body.catalogName,
      },
      {
        where: { id: req.body.catalogId, userId: req.tokenData.userId },
        returning: true,
      }
    );
    if (!catalog) throw new ServerError(404, '404 Catalog not found');
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalogs.findOne({
      where: { id: req.body.catalogId },
    });
    if (!catalog) throw new ServerError(404, '404 Catalog not found');

    await db.CatalogsToConversations.create({
      catalogId: req.body.catalogId,
      conversationId: req.body.chatId,
    });

    const chatsToCatalog = await db.CatalogsToConversations.findAll({
      where: { catalogId: req.body.catalogId },
    });

    res.send({
      id: catalog.id,
      catalogName: catalog.catalogName,
      userId: catalog.userId,
      chats: chatsToCatalog.map((chat) => chat.conversationId),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalogs.findOne({
      where: { id: req.body.catalogId },
    });
    if (!catalog) throw new ServerError(404, '404 Catalog not found');

    await db.CatalogsToConversations.destroy({
      where: { catalogId: req.body.catalogId, conversationId: req.body.chatId },
    });

    const chatsToCatalog = await db.CatalogsToConversations.findAll({
      where: { catalogId: req.body.catalogId },
    });

    res.send({
      id: catalog.id,
      catalogName: catalog.catalogName,
      userId: catalog.userId,
      chats: chatsToCatalog.map((chat) => chat.conversationId),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const ctc = await db.CatalogsToConversations.destroy({
      where: { catalogId: req.body.catalogId },
    });
    const c = await db.Catalogs.destroy({
      where: { id: req.body.catalogId, userId: req.tokenData.userId },
    });
    if (ctc === 0 && c === 0)
      throw new ServerError(404, '404 Catalog not found');
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await db.Catalogs.findAll({
      where: { userId: req.tokenData.userId },
      include: [
        {
          model: db.CatalogsToConversations,
          as: 'conversationLinks',
          required: false,
        },
      ],
    });
    res.send(
      catalogs.map((i) => {
        return {
          id: i.id,
          catalogName: i.catalogName,
          chats: i.conversationLinks.map((j) => j.conversationId),
        };
      })
    );
  } catch (err) {
    next(err);
  }
};
