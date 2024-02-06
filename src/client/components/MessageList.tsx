import React from 'react';

import Message from "./Message";
import { MessengerContext } from './MessengerContext';

const MessageList = () => {

  const {messengerState, setMessengerState} = React.useContext(MessengerContext);

  return (
    <div>
      {messengerState.messages.map(x => {
        <Message username={x.username} content={x.content}/>
      })}
    </div>
  )
};

export default MessageList