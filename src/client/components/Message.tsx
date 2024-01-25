import React from 'react';

interface MessageProps {
    username: string;
    content: string;
};

const Message = (props: MessageProps) => {

    return (
        <div className="message">
            <div className="message-sender">
                <p>{props.username}</p>
            </div>
            <div className="message_content">
                <p>{props.content}</p>
            </div>
        </div>
    );
};

export default Message;