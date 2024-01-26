import React from 'react';

import { MessengerContext } from './MessengerContext';

const CreateRoomForm = () => {
  const {messengerState, setMessengerState} = React.useContext(MessengerContext);

  /// Functions

  const joinRoom = (roomId: string) => {
    const responsePromise = fetch(
      `http://${window.location.hostname}:${window.location.port}/v1/room/join`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          session: window.localStorage.getItem('session'),
        },
        body: `{"room": "${roomId}"}`,
      }
    );
    responsePromise.then((rawResponse : Response) => {
      const jsonResponsePromise = rawResponse.json();

      jsonResponsePromise.then((jsonResponse) => {
        if (rawResponse.status == 200) {
          setMessengerState({
            roomId: roomId,
            messages: messengerState.messages,
            socket: messengerState.socket,
          });

        } else {
          window.alert("room join failed");
        }
      }).catch((err) => {
        console.error(err);
        window.alert("room join failed due to error");
      });
    }).catch((err) => {
      console.error(err);
      window.alert("room join failed due to error");
    });
  };

  const handleSubmit = () => {
    const responsePromise = fetch(
      `http://${window.location.hostname}:${window.location.port}/v1/room/create`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          session: window.localStorage.getItem('session'),
        },
        body: "{}",
      }
    );
    responsePromise.then((rawResponse : Response) => {
      const jsonResponsePromise: Promise<{room: string}> = rawResponse.json();

      jsonResponsePromise.then((jsonResponse : {room: string}) => {
        if (rawResponse.status == 200) {

          // automatically join the room
          joinRoom(jsonResponse.room);

        } else {
          window.alert("room create failed");
        }
      }).catch((err) => {
        console.error(err);
        window.alert("room create failed due to error");
      });
    }).catch((err) => {
      console.error(err);
      window.alert("room create failed due to error");
    });
  }

  /// Return statement

  return (
    <div className="create-roomform">
      <div className="create-room-form">
        <form name="create-room-form">
          <input 
            type = 'submit'
            value = 'Create Room'
            className = 'create-room-submit-button'
            onClick = {(event : React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              handleSubmit();
            }}
          />
        </form>
      </div>
    </div>
  )
};

export default CreateRoomForm;