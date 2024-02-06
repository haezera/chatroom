import React from "react";

import { MessengerContext } from './MessengerContext';

const MessageCreator = () => {
  console.log('rendering message creator');
  
  const {messengerState, setMessengerState} = React.useContext(MessengerContext);
  const [messageInput, setMessageInput] = React.useState<string>("");

  /// Functions
  
  const handleSubmit = () => {
    messengerState.socket.send(messageInput);
  }
  
  /// Return Value
    
  return (
    <div className="message-creator">
      <div className="message-creator-form">
        <form name="message-creator-form">
          {React.createElement("input", {
            placeholder: "message", 
            className: 'message-input-box',
            onChange: (event : React.ChangeEvent) => {
              setMessageInput(event.target.value);
            },
          })}
          {React.createElement('input', {
            type: 'submit',
            value: 'Submit',
            className: 'message-submit-button',
            onClick: (event : React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              handleSubmit();
            }
          })}
        </form>
      </div>
    </div>
  );
}

export default MessageCreator;