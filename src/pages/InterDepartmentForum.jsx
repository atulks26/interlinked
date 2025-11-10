import React, { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaReply,
  FaHashtag,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const departments = [
  "Architecture Department",
  "Advertisement",
  "Assessment and Collection Department",
  "Ayush Department",
  "Building Department",
  "Central Establishment",
  "Community Services",
  "Engineering Department",
  "Public Health Department",
  "Finance Department",
];

const channels = ["#general", "#projects", "#announcements", "#updates"];
const users = ["Ankur", "Sanchita", "Priyanshu", "Atul", "Ritika", "Rahul", "Pooja"];
const messagesPool = [
  "Please review the latest updates.",
  "Any feedback on the recent changes?",
  "Reminder: Submit your reports by EOD.",
  "Project X completed successfully.",
  "Meeting scheduled for 3 PM.",
];

const generateMessages = (dept, channel) => {
  const msgCount = Math.floor(Math.random() * 5) + 5;
  return Array.from({ length: msgCount }, (_, i) => {
    const user = users[Math.floor(Math.random() * users.length)];
    return {
      id: `${dept}-${channel}-${i}`,
      department: user,
      avatar: `https://i.pravatar.cc/40?u=${dept}-${i}`,
      message: messagesPool[Math.floor(Math.random() * messagesPool.length)],
      time: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      replies: [],
    };
  });
};

const InterDepartmentForum = () => {
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [messages, setMessages] = useState(generateMessages(departments[0], channels[0]));
  const [newMessage, setNewMessage] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    setMessages(generateMessages(selectedDept, selectedChannel));
  }, [selectedDept, selectedChannel]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: `msg-${Date.now()}`,
      department: "You",
      avatar: `https://i.pravatar.cc/40?u=you-${Date.now()}`,
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      replies: [],
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  const handleSendReply = (index) => {
    if (!replyText.trim()) return;
    setMessages((prev) => {
      const updated = [...prev];
      updated[index].replies.push({
        id: `reply-${Date.now()}`,
        user: "You",
        message: replyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
      return updated;
    });
    setReplyText("");
    setReplyIndex(null);
  };

  return (
    <div className="flex">
      ✅ Sidebar same as ManageJunior
      <Sidebar type="admin" />

      {/* ✅ Main Content */}
      <div className="container mx-auto p-6 flex-1">
        {/* PAGE HEADER */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Inter-Department Forum
          </h1>
          <span className="text-gray-500 text-sm">{messages.length} messages</span>
        </div>

        {/* SELECTION CONTROLS */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 justify-between">
          <div>
            <label className="font-semibold mr-2">Department:</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="border rounded px-3 py-1 focus:outline-yellow-400"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold mr-2">Channel:</label>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="border rounded px-3 py-1 focus:outline-yellow-400"
            >
              {channels.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="bg-white rounded-lg shadow p-4 mb-4 space-y-4 overflow-y-auto max-h-[60vh]">
          {messages.map((msg, index) => (
            <div key={msg.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <img src={msg.avatar} alt="" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">{msg.department}</h3>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <p className="mt-1 text-gray-700">{msg.message}</p>

                  {/* REPLIES */}
                  {msg.replies.length > 0 && (
                    <div className="mt-3 pl-4 border-l border-gray-200 space-y-2">
                      {msg.replies.map((rep) => (
                        <div key={rep.id} className="bg-gray-50 p-2 rounded">
                          <p className="text-gray-700">
                            <strong>{rep.user}:</strong> {rep.message}
                          </p>
                          <span className="text-xs text-gray-400">{rep.time}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setReplyIndex(index === replyIndex ? null : index)}
                    className="mt-3 text-yellow-600 text-sm flex items-center gap-1 hover:underline"
                  >
                    <FaReply /> Reply
                  </button>

                  {replyIndex === index && (
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        placeholder="Type your reply..."
                        className="flex-1 border rounded px-3 py-2 focus:outline-yellow-400"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendReply(index)}
                      />
                      <button
                        onClick={() => handleSendReply(index)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded"
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* INPUT BAR */}
        <div className="bg-white p-4 mt-4 rounded-lg shadow flex gap-3">
          <input
            type="text"
            className="flex-1 border rounded px-4 py-2 focus:outline-yellow-400"
            placeholder={`Message ${selectedDept}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-5 py-2 rounded-lg"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterDepartmentForum;
