import React from 'react';
import { MessengerContext } from './MessengerContext';


import MessageList from './MessageList';
import RoomSelector from './RoomSelector';
import ConnectButton from './ConnectButton';

const Messenger = () => {

  const {messengerState, setMessengerState} = React.useContext(MessengerContext);

  return (
    <div>
      <RoomSelector />
      {
        (() => {
          if (messengerState.roomId == null) {
            return (
              <div>
                <p>Join a room first</p>
              </div>
            );
          } else if (messengerState.socket == null) {
            return (
              <div>
                <ConnectButton />
              </div>
            );
          } else {
            return (
              <MessageList />
            );
          }
        })()
      }
    </div>
  );
};

export default Messenger;