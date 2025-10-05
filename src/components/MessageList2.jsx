import React, { useState } from "react";
import "../styles/DepartmentForum.css";

const MessageList2 = () => {
    const [messages, setMessages] = useState([
        {
            department: "Ankur",
            message: "@Atul @Priyanshu bhai jldi frontend ka kaam krdo",
            time: "2024-09-10 10:00 AM",
            replies: [],
        },
        {
            department: "Sanchita",
            message: "@Ankur tu map bnane wala tha, kaha hai?",
            time: "2024-09-10 10:15 AM",
            replies: [],
        },
        {
            department: "Ankur",
            message: "@Sanchita No electricity, no wifi. Kal bnata hu.",
            time: "2024-09-10 10:30 AM",
            replies: [],
        },
        {
            department: "Sanchita",
            message: "@Ankur to WhatsApp kaise chla rha hai",
            time: "2024-09-10 10:45 AM",
            replies: [],
        },
        {
            department: "Ankur",
            message: "@Sanchita Mobile data, aur 12% battery pe",
            time: "2024-09-10 11:00 AM",
            replies: [],
        },
    ]);

    const [replyIndex, setReplyIndex] = useState(null); // Track the message being replied to
    const [replyText, setReplyText] = useState(""); // Track reply text

    const handleReplyClick = (index) => {
        setReplyIndex(index);
    };

    const handleSendReply = () => {
        if (replyIndex !== null && replyText.trim() !== "") {
            const updatedMessages = [...messages];
            const currentTime = new Date().toLocaleString();
            updatedMessages[replyIndex].replies.push({
                message: replyText,
                time: currentTime,
            });
            setMessages(updatedMessages);
            setReplyText(""); // Clear the reply input
            setReplyIndex(null); // Close the reply input field after sending the reply
        }
    };

    return (
        <div>
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className="message-item">
                        <span>{msg.department}</span>
                        <p>{msg.message}</p>
                        <div className="message-meta">
                            <span>{msg.time}</span>
                            <button onClick={() => handleReplyClick(index)}>
                                Reply
                            </button>
                        </div>
                        <div className="replies">
                            {msg.replies.map((reply, i) => (
                                <div key={i} className="reply-item">
                                    <p>
                                        <strong>Reply:</strong> {reply.message}
                                    </p>
                                    <span>{reply.time}</span>
                                </div>
                            ))}
                        </div>
                        {/* Show reply input for the selected message */}
                        {replyIndex === index && (
                            <div className="reply-input">
                                <textarea
                                    placeholder="Type your reply..."
                                    value={replyText}
                                    onChange={(e) =>
                                        setReplyText(e.target.value)
                                    }
                                ></textarea>
                                <button onClick={handleSendReply}>
                                    Send Reply
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageList2;
