import React from 'react';

import { MessengerContext } from './MessengerContext';

const LeaveRoomButton = () => {

  const {messengerState, setMessengerState} = React.useContext(MessengerContext);

  const handleSubmit = () => {
    const responsePromise = fetch(
      `http://${window.location.hostname}:${window.location.port}/v1/room/leave`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          session: window.localStorage.getItem('session'),
        },
      }
    );
    responsePromise.then((rawResponse : Response) => {
      const jsonResponsePromise: Promise<any> = rawResponse.json();

      jsonResponsePromise.then((jsonResponse : any) => {
        if (rawResponse.status == 200) {
          setMessengerState({
            roomId: null,
            messages: messengerState.messages,
            socket: messengerState.socket,
          });

        } else {
          window.alert("room leave failed");
        }
      }).catch((err) => {
        console.error(err);
        window.alert("room leave failed due to error");
      });
    }).catch((err) => {
      console.error(err);
      window.alert("room leave failed due to error");
    });
  }

  return (
    <button 
      class="leave-room-button" 
      onClick={(event) => {
        handleSubmit();
      }}
    >Leave Room</button>
  );  
};

export default LeaveRoomButton;