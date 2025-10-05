// ParentComponent.jsx
import React from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList'; // Assuming you also need this

const ParentComponent = () => {
  const handleSendMessage = (messageData) => {
    // Implement your logic to handle sending the message here
    console.log('Message data received:', messageData);
  };

  return (
    <div className="department-content">
      <MessageList />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ParentComponent;
