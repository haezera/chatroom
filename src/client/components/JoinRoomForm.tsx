import React from 'react';

import { MessengerContext } from './MessengerContext';

const JoinRoomForm = () => {
  const {messengerState, setMessengerState} = React.useContext(MessengerContext);

  const [roomInput, setRoomInput] = React.useState<string>("");

  /// Functions

  const handleSubmit = () => {
    const responsePromise = fetch(
      `http://${window.location.hostname}:${window.location.port}/v1/room/join`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          session: window.localStorage.getItem('session'),
        },
        body: `{"room": "${roomInput}"}`,
      }
    );
    responsePromise.then((rawResponse : Response) => {
      const jsonResponsePromise = rawResponse.json();

      jsonResponsePromise.then((jsonResponse) => {
        if (rawResponse.status == 200) {
          setMessengerState({
            roomId: roomInput,
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
  }

  /// Return statement

  return (
    <div className="join-roomform">
      <div className="join-room-form">
        <form name="join-room-form">
          <input
            placeholder = "room ID"
            className = 'room-id-input-box'
            onChange = {(event : React.ChangeEvent) => {
              setRoomInput(event.target.value);
            }}
          />
          <input 
            type = 'submit'
            value = 'Join Room'
            className = 'join-room-submit-button'
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

export default JoinRoomForm;