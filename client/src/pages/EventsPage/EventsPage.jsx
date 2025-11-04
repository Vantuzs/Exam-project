// import React from 'react';
// import InputeField from '../../components/EventsComponents/InputeField/InputeField';

// const EventsPage = (props) => {
//     return (
//         <>
//         {console.log(1)}
//         {console.log(props.accessToken)}
//           <InputeField/>     
//         </>
//     );
// }

// export default EventsPage;


import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InputeField from '../../components/EventsComponents/InputeField/InputeField';
import CONSTANTS from '../../constants';

const EventsPage = props => {
  const navigate = useNavigate();
  const { role } = useSelector(state => state.userStore.data);
  // const params = useParams();

  useEffect(()=>{
    if(role === 'undefiend' || role === 'null') return
    if(role != CONSTANTS.CUSTOMER) navigate('/')
  },[role,navigate])

  if(role === 'undefiend' || role === 'null') (<div>Loading.....</div>)
  if(role != CONSTANTS.CUSTOMER) return null 

  return <InputeField navigate={navigate} />
};


export default EventsPage;