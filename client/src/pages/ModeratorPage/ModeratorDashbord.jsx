import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CONSTANTS from '../../constants';
import ModeratorPageFunc from './ModeratorPageFunc';

const ModeratorDashbord = props => {
  const navigate = useNavigate();
  const params = useParams();

  const { role } = useSelector(state => state.userStore.data);
  return role === CONSTANTS.MODERATOR &&
    <ModeratorPageFunc navigate={navigate} params={params} />
};


export default ModeratorDashbord;
