import React from 'react';

export interface Message {
  sender: string;
  timestamp: number;
  content: string;
};

// WARNING
// Due to some issues with using the spread operator when
// setting a state, this interface cannot be modified without
// making modifications in ConnectButton.tsx
interface MessengerStateInterface {
  roomId: string;
  socket: WebSocket;
  messages: Message[];
};

interface MessengerContextInterface {
  messengerState: MessengerStateInterface;
  setMessengerState: React.Dispatch<React.SetStateAction<MessengerStateInterface>>;
};

const MessengerContext = React.createContext<MessengerContextInterface>({
  messengerState: null,
  setMessengerState: null,
});

const MessengerContextProvider : React.FC<{children: React.ReactNode[]}> = ({children}) => {
  const [messengerState, setMessengerState] = React.useState<MessengerStateInterface>({
    roomId: null,
    socket: null,
    messages: [],
  });
  return React.createElement(
    MessengerContext.Provider, 
    {value: {messengerState, setMessengerState}},
    children
  );
};

export { MessengerContext, MessengerContextProvider};