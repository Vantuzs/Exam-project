const db = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const controller = require('../socketInit');
const CONSTANTS = require('../constants');
const { sendModeratorAnswer } = require('../utils/meiler');

module.exports.getOffers = (req, res, next) => {
  db.Offers.findAll({
    where: { isModerated: false, status: 'pending' },
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    include: [
      {
        model: db.Users,
        required: false,
        attributes: [
          'id',
          'avatar',
          'displayName',
          'email',
          'firstName',
          'lastName',
          'rating',
        ],
      },
    ],
  })
    .then((offers) => {
      let haveMore = offers.length > 0;
      if (offers.length === 0) {
        haveMore = false;
      }
      res.send({ offers: offers, haveMore });
    })
    .catch((err) => {
      next(new ServerError());
    });
};

const resolveOffer = (offerId) => {
  db.Offers.update({ isModerated: true }, { where: { id: offerId } });
};

const rejectOffer = async (offerId, creatorId, contestId = 'Moderator') => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId }
  );
  controller.getNotificationController().emitChangeOfferStatus({
    status: CONSTANTS.OFFER_STATUS_REJECTED,
    target: creatorId,
    message: 'Someone of yours offers was rejected',
    contestId,
  });
  return rejectedOffer;
};

module.exports.setOfferStatusModerator = async (req, res, next) => {
  const { offerId, command, creatorId } = req.body;

  try {
    let offer;

    if (command === 'reject') {
      offer = await rejectOffer(offerId, creatorId);
    } else if (command === 'resolve') {
      offer = await resolveOffer(offerId);
    }

    const user = await db.Users.findByPk(creatorId, {
      attributes: ['email', 'displayName'],
    });

    if (user) {
      await sendModeratorAnswer(user.email, command, offerId);
    }

    res.send(offer);
  } catch (error) {
    next(error);
  }
};
