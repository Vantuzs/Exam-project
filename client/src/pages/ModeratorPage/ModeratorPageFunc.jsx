import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import CONSTANTS from '../../constants';
import ContestsContainer from '../../components/ContestsContainer/ContestsContainer';
import OfferBoxTwo from './OfferBoxTwo';
import { getAllOfers, setOfferStatusModerator } from '../../store/slices/offersSlice';
import styles from './ModeratorPage.module.scss';

const ModeratorPageFunc = (props) => {
  const [offers,setOffers] = useState([])
  const { offerStore:{error, haveMore, isFetching}, offerStore, customerFilter } = props;

  useEffect(() => {
    setOffers([])
    props.getOffers({
      limit: 8,
      offset: 0
    });
  }, []);

  useEffect(() => {
  if (offerStore.offers && offerStore.offers.length > 0) {
    setOffers((prev) => {
      const indew = new Set(prev.map(o=>o.id));
      const filter = offerStore.offers.filter(o=> !indew.has(o.id))
      return[...prev, ...filter]
    });
    }
  },[offerStore.offers]);
  
    const loadMore = (startFrom) => {
    props.getOffers({
      limit: 8,
      offset: startFrom
    });
  };


  const handleOfferStatus = async (creatorId, offerId, command) => {
    const obj = { command, offerId, creatorId };
    await props.setOfferStatusModeratorFront(obj);
    setOffers((prev)=> prev.filter(i=>i.id!=offerId))
  };

  const renderOffers = () => {
    if (!offers || offers.length === 0) {
      return <div className={styles.notFound}>There is no suggestion at this moment</div>;
    }

    return offers.map((offer) => (
      <OfferBoxTwo
        key={offer.id}
        data={offer}
        setOfferStatusModerator={handleOfferStatus}
        date={new Date()}
      />
    ));
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contestsContainer}>
        <ContestsContainer
          isFetching={isFetching}
          loadMore={loadMore}
          navigate={props.navigate}
          haveMore={haveMore}
        >
          {renderOffers()}
        </ContestsContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { userStore, offerStore, contestsList } = state;
  return { userStore, offerStore, contestsList };
};

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CUSTOMER })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
  getOffers: (data) => dispatch(getAllOfers(data)),
  setOfferStatusModeratorFront: (data) => dispatch(setOfferStatusModerator(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorPageFunc);
