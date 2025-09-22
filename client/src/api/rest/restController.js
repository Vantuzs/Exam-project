import http from '../interceptor';

export const registerRequest = data => http.post('registration', data);
export const loginRequest = data => http.post('login', data);
export const getUser = () => http.post('getUser');
export const updateContest = data => http.post('updateContest', data);
export const setNewOffer = data => http.post('setNewOffer', data);
export const setOfferStatus = data => http.post('setOfferStatus', data);
export const downloadContestFile = data =>
  http.get(`downloadFile/${data.fileName}`);
export const payMent = data => http.post('pay', data.formData);
export const changeMark = data => http.post('changeMark', data);
export const getPreviewChat = () => http.post('getPrevewSQL');
export const getDialog = data => http.post('getChatSQL', data);
export const dataForContest = data => http.post('dataForContest', data);
export const cashOut = data => http.post('cashout', data);
export const updateUser = data => http.post('updateUser', data);
export const newMessage = data => http.post('sendMessageSQL', data);
export const changeChatFavorite = data => http.post('favoriteSQL', data);
export const changeChatBlock = data => http.post('blackListSQL', data);
export const getCatalogList = data => http.post('getCatalogsSQL', data);
export const addChatToCatalog = data => http.post('addNewChatToCatalogSQL', data);
export const createCatalog = data => http.post('createCatalogSQL', data);
export const deleteCatalog = data => http.post('deleteCatalogSQL', data);
export const removeChatFromCatalog = data =>
  http.post('removeChatFromCatalogSQL', data);
export const changeCatalogName = data => http.post('updateNameCatalogSQL', data);
export const getCustomersContests = data =>
  http.post(
    'getCustomersContests',
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus,
      },
    }
  );

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.post('getAllContests', {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  });

export const getContestById = data =>
  http.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });

export const getAllOffers = data =>
  http.post('getAllOffers',data);

export const setOfferStatusModerator = data => http.post('setOfferStatusModerator',data)