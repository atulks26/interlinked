// MessageInput.jsx
import React, { useState } from 'react';
import "../styles/DepartmentForum.css";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);

  // Log onSendMessage to verify
  console.log('onSendMessage:', onSendMessage);
  
  const handleSendMessage = () => {
    if (message.trim() || attachment) {
      if (typeof onSendMessage === 'function') {
        onSendMessage({
          message,
          attachment,
          department: "@your_department"  // This can be dynamically changed as per the department.
        });
      } else {
        console.error('onSendMessage is not a function');
      }
      setMessage('');
      setAttachment(null);  // Reset attachment after sending
    }
  };

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleMention = (departmentName) => {
    setMessage(prev => `${prev}@${departmentName} `);
  };

  return (
    <div className="message-input">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message #general"
      ></textarea>
      <div className="input-controls">
        <input type="file" onChange={handleAttachmentChange} />
        <button onClick={() => handleMention('traffic_mgmt')}>@Mention Traffic</button>
        <button onClick={() => handleMention('urban_planning_dept')}>@Mention Urban Planning</button>
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessageInput;
