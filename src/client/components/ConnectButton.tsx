import React from 'react';

import { MessengerContext } from './MessengerContext';

const ConnectButton = () => {

  const {messengerState, setMessengerState} = React.useContext(MessengerContext);

  const connectWebsocket = () => {

    // debug
    console.log(`ws://${window.location.hostname}:${window.location.port}`);
    const socket = new WebSocket(`ws://${window.location.hostname}:${window.location.port}/chat`);

    socket.onopen = (event) => {
      console.log("websocket is open");

      // TODO: bring up in a meeting
      // some custom handshake thing
      socket.send(window.localStorage.getItem("session"));
      
      // TODO: discuss this and its consequences
      // I can't use the spread operator inside for some reason
      setMessengerState({
        roomId: messengerState.roomId,
        messages: messengerState.messages,
        socket: socket,
      });

      console.log(messengerState);

      socket.onmessage = (msg) => {
        messengerState.messages.push(JSON.parse(msg.data()));

        setMessengerState({
          roomId: messengerState.roomId,
          messages: messengerState.messages,
          socket: messengerState.socket,
        });
      }
    };
  }
      
  return (
    <button onClick={(event) => {
      connectWebsocket();
    }}>
      Connect to Websocket
    </button>
  );
};

export default ConnectButton;