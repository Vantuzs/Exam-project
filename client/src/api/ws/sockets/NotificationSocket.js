import React from 'react';
import { toast } from 'react-toastify';
import WebSocket from './WebSocket';
import Notification from '../../../components/Notification/Notification';

class NotificationSocket extends WebSocket {
  constructor (dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onEntryCreated();
    this.onChangeMark();
    this.onChangeOfferStatus();
  };

  onChangeMark = () => {
    this.socket.on('changeMark', () => {
      toast.info('Someone liked your offer');
    });
  };

  onChangeOfferStatus = () => {
    this.socket.on('changeOfferStatus', data => {
      if(data.status === 'won'){
        toast.success(
          <Notification message={data.message} contestId={data.contestId} />
        );
      } else if (data.status === 'rejected'){
        toast.error(
          <Notification message={data.message} contestId={data.contestId} />
        );
      }
    });
  };

  onEntryCreated = () => {
    this.socket.on('onEntryCreated', () => {
      toast('New Entry');
    });
  };

  subscribe = id => {
    this.socket.emit('subscribe', id);
  };

  unsubsctibe = id => {
    this.socket.emit('unsubscribe', id);
  };
}

export default NotificationSocket;
