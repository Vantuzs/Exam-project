import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import * as restController from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  createExtraReducers,
  pendingReducer
} from '../../utils/store';


const OFFERS_SLISE_NAME = 'getOffers'

const initialState = {
  isFetching: true,
  error: null,
  offers: [],
  addOfferError: null,
  setOfferStatusError: null,
  changeMarkError: null,
  isBrief: true,
  haveMore: true
}

export const getAllOfers = decorateAsyncThunk({
  key: `${OFFERS_SLISE_NAME}/getAllOffers`,
  thunk: async payload => {
    const {data} = await restController.getAllOffers(payload)
    return data
  }
})

export const setOfferStatusModerator = decorateAsyncThunk({
  key: `${OFFERS_SLISE_NAME}/setOfferStatusModerator`,
  thunk: async payload => {
    const {data} = await restController.setOfferStatusModerator(payload)
    return data
  }
})

const setOfferStatusModeratorExtraReducers = createExtraReducers({
  thunk: setOfferStatusModerator,
  fulfilledReducer: (state, { payload }) => {
      state.offers = state.offers.map(offer =>
    offer.id === payload.id
      ? {
          ...offer,
          isModarated: payload.isModarated,
          status: payload.isModarated
            ? offer.status
            : CONSTANTS.OFFER_STATUS_REJECTED,
        }
      : offer
  );
  state.error = null;
  },
  rejectedReducer: (state, { payload }) => {
    state.setOfferStatusError = payload;
  },
});


const reducers = {
  clearContestsList: state => {
    state.error = null;
    state.offers = [];
  },
};

const getAllOffersExtraReducers = builder => {
  builder.addCase(getAllOfers.pending, pendingReducer);
  builder.addCase(getAllOfers.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.offers = payload.offers;
    state.haveMore = payload.haveMore;
  });
  builder.addCase(getAllOfers.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.offers = [];
  });
};

const extraReducers = builder => {
  getAllOffersExtraReducers(builder);
  setOfferStatusModeratorExtraReducers(builder);
};

const offersSlise = createSlice({
  name: OFFERS_SLISE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = offersSlise;

export const {
  clearContestsList
} = actions;

export default reducer;