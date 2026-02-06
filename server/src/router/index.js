const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const offerController = require('../controllers/offerController')
const chatCntrollerSQL = require('../controllers/chatControllerSQL')
const upload = require('../utils/fileUpload');
const router = express.Router();

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);

router.post(
  '/login',
  validators.validateLogin,
  userController.login,
);

router.post(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest,
);

router.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

router.post(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests,
);

router.get(
  '/getContestById',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

router.post(
  '/getAllContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

router.post(
  '/getUser',
  checkToken.checkAuth,
  userController.getUser
);

router.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile,
);

router.post(
  '/updateContest',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest,
);

router.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

router.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

router.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

router.post(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser,
);

router.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

router.post(
  '/newMessage',
  checkToken.checkToken,
  chatController.addMessage,
);

router.post(
  '/getChat',
  checkToken.checkToken,
  chatController.getChat,
);

router.post(
  '/getPreview',
  checkToken.checkToken,
  chatController.getPreview,
);

router.post(
  '/blackList',
  checkToken.checkToken,
  chatController.blackList,
);

router.post(
  '/favorite',
  checkToken.checkToken,
  chatController.favoriteChat,
);

router.post(
  '/createCatalog',
  checkToken.checkToken,
  chatController.createCatalog,
);

router.post(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog,
);

router.post(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog,
);

router.post(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog,
);

router.post(
  '/deleteCatalog',
  checkToken.checkToken,
  chatController.deleteCatalog,
);

router.post(
  '/getCatalogs',
  checkToken.checkToken,
  chatController.getCatalogs,
);

router.post(
  '/getAllOffers',
  checkToken.checkToken,
  offerController.getOffers
)

router.post(
  '/setOfferStatusModerator',
  checkToken.checkToken,
  offerController.setOfferStatusModerator
)

router.post(
  '/sendMessageSQL',
  checkToken.checkToken,
  chatCntrollerSQL.addMessage
)

router.post(
  '/getChatSQL',
  checkToken.checkToken,
  chatCntrollerSQL.getChat
)

router.post(
  '/getPrevewSQL',
  checkToken.checkToken,
  chatCntrollerSQL.getPreview
)

router.post(
  '/blackListSQL',
  checkToken.checkToken,
  chatCntrollerSQL.blackList
)

router.post(
  '/favoriteSQL',
  checkToken.checkToken,
  chatCntrollerSQL.favoriteChat
)

router.post(
  '/createCatalogSQL',
  checkToken.checkToken,
  chatCntrollerSQL.createCatalog
)

router.post(
  '/updateNameCatalogSQL',
  checkToken.checkToken,
  chatCntrollerSQL.updateNameCatalog
)

router.post(
  '/addNewChatToCatalogSQL',
  checkToken.checkToken,
  chatCntrollerSQL.addNewChatToCatalog
)

router.post(
  '/removeChatFromCatalogSQL',
  checkToken.checkToken,
  chatCntrollerSQL.removeChatFromCatalog
)

router.post(
  '/deleteCatalogSQL',
  checkToken.checkToken,
  chatCntrollerSQL.deleteCatalog
)

router.post(
  '/getCatalogsSQL',
  checkToken.checkToken,
  chatCntrollerSQL.getCatalogs
)

module.exports = router;
