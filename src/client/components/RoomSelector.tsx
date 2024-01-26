import React from 'react';

import JoinRoomForm from './JoinRoomForm';
import CreateRoomForm from './CreateRoomForm';
import LeaveRoomButton from './LeaveRoomButton';
import { MessengerContext } from './MessengerContext';

const RoomSelector = () => {

  const {messengerState, setMessengerState} = React.useContext(MessengerContext);

  return (
    <div>
      {
        (() => {
          if (messengerState.roomId == null) {
            return (
              <>
                <CreateRoomForm />
                <JoinRoomForm />
              </>
            );
          } else {
            return (
              <>
                <p>Currently in room {messengerState.roomId}</p>
                <LeaveRoomButton />
              </>
            );
          }
        })()
      }
    </div>
  )

};

export default RoomSelector;