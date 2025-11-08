import React, { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaReply,
  FaChevronRight,
  FaHashtag,
  FaBars,
} from "react-icons/fa";
import AdminSidebar from "../components/Sidebar";

const channels = ["#general", "#projects", "#announcements", "#updates"];
const users = ["Ankur", "Sanchita", "Priyanshu", "Atul", "Ritika", "Rahul", "Pooja"];
const messagesPool = [
  "Please review the latest updates.",
  "Any feedback on the recent changes?",
  "Reminder: Submit your reports by EOD.",
  "Project X completed successfully.",
  "Meeting scheduled for 3 PM.",
];

const generateMessages = (channel) => {
  const msgCount = Math.floor(Math.random() * 5) + 5;
  return Array.from({ length: msgCount }, (_, i) => {
    const user = users[Math.floor(Math.random() * users.length)];
    return {
      id: `${channel}-${i}`,
      department: user,
      avatar: `https://i.pravatar.cc/40?u=${channel}-${i}`,
      message: messagesPool[Math.floor(Math.random() * messagesPool.length)],
      time: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      replies: [],
    };
  });
};

const IntraDepartmentForum = ({ user, handleLogout }) => {
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [messages, setMessages] = useState(generateMessages(channels[0]));
  const [newMessage, setNewMessage] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setMessages(generateMessages(selectedChannel));
  }, [selectedChannel]);

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
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const handleSendReply = (index) => {
    if (!replyText.trim()) return;
    const updated = [...messages];
    updated[index].replies.push({
      id: `reply-${Date.now()}`,
      user: "You",
      message: replyText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    setMessages(updated);
    setReplyText("");
    setReplyIndex(null);
  };

  const toggleSidebar = () => setLeftSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      {/* LEFT NAVIGATION SIDEBAR */}
      <div
        className={`fixed md:static z-50 h-full transform transition-transform duration-300
          ${leftSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <AdminSidebar
          user={user}
          handleLogout={handleLogout}
          isOpen={leftSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* LEFT OVERLAY */}
      {leftSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setLeftSidebarOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col md:ml-64 md:mr-72 p-4 md:p-6 overflow-hidden">
        {/* PAGE TITLE */}
        <div className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLeftSidebarOpen(true)}
              className="md:hidden bg-blue-600 text-white p-2 rounded-full"
            >
              <FaBars />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              Intra-Department Forum
            </h1>
          </div>

          <button
            onClick={() => setRightSidebarOpen(true)}
            className="md:hidden bg-blue-600 text-white p-2 rounded-full"
          >
            <FaHashtag />
          </button>
        </div>

        {/* CHAT HEADER */}
        <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {user?.department} {selectedChannel}
          </h2>
          <span className="text-gray-500 text-sm">
            {messages.length} messages
          </span>
        </div>

        {/* CHAT MESSAGES */}
        <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow p-4 space-y-4">
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
                    className="mt-3 text-blue-600 text-sm flex items-center gap-1 hover:underline"
                  >
                    <FaReply /> Reply
                  </button>

                  {replyIndex === index && (
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        placeholder="Type your reply..."
                        className="flex-1 border rounded px-3 py-2 focus:outline-blue-400"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendReply(index)}
                      />
                      <button
                        onClick={() => handleSendReply(index)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
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
            className="flex-1 border rounded px-4 py-2 focus:outline-blue-400"
            placeholder={`Message ${selectedChannel}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div
        className={`fixed md:static right-0 top-0 z-50 h-full bg-white shadow-md transform transition-transform duration-300 
          ${rightSidebarOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 w-72`}
      >
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Channels</h2>
          <button className="md:hidden" onClick={() => setRightSidebarOpen(false)}>
            <FaChevronRight />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          <ul className="space-y-2">
            {channels.map((ch) => (
              <li
                key={ch}
                onClick={() => {
                  setSelectedChannel(ch);
                  setRightSidebarOpen(false);
                }}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-100 ${
                  selectedChannel === ch ? "bg-blue-200 font-semibold" : "text-gray-700"
                }`}
              >
                <FaHashtag /> {ch}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT OVERLAY */}
      {rightSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setRightSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default IntraDepartmentForum;
