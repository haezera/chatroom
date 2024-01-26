import React from 'react';

import { MessengerContext } from './MessengerContext';

const DeleteRoomButton = () => {

  const {messengerState, setMessengerState} = React.useContext(MessengerContext);

  const handleSubmit = () => {
    const params = new URLSearchParams();
    params.append("room", messengerState.roomId);
    const responsePromise = fetch(
      `http://${window.location.hostname}:${window.location.port}/v1/room/delete?${params.toString()}`,
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
            messages: [],
            socket: null,
          });

        } else {
          window.alert("room delete failed");
        }
      }).catch((err) => {
        console.error(err);
        window.alert("room delete failed due to error");
      });
    }).catch((err) => {
      console.error(err);
      window.alert("room delete failed due to error");
    });
  }

  return (
    <button 
      class="delete-room-button" 
      onClick={(event) => {
        handleSubmit();
      }}
    >Delete Room</button>
  );  
};

export default DeleteRoomButton;