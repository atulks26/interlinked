import React, { useState } from "react";
import "../styles/DepartmentForum.css";

const MessageList = () => {
    const [messages, setMessages] = useState([
        {
            department: "@urban_planning_dept",
            message:
                "Hey @traffic_mgmt, we're planning road expansions in Sector 9. Can we coordinate on rerouting traffic?",
            time: "2024-09-10 10:00 AM",
            replies: [],
        },
        {
            department: "@traffic_mgmt",
            message:
                "@urban_planning_dept Absolutely! We’ll need to set up temporary traffic lights and reroute vehicles to Sector 12. Let’s finalize a date.",
            time: "2024-09-10 10:15 AM",
            replies: [],
        },
        {
            department: "@urban_planning_dept",
            message:
                "Great! How about starting on the 15th? We can give the public a week's notice.",
            time: "2024-09-10 10:30 AM",
            replies: [],
        },
        {
            department: "@traffic_mgmt",
            message:
                "Sounds good! I’ll have our team draft a traffic management plan by tomorrow.",
            time: "2024-09-10 10:45 AM",
            replies: [],
        },
        {
            department: "@urban_planning_dept",
            message:
                "Thanks! We’ll sync up once we have the final construction schedule ready.",
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

export default MessageList;
