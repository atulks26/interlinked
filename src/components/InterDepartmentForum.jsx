import React, { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaReply,
  FaChevronRight,
  FaHashtag,
  FaBars,
} from "react-icons/fa";
import AdminSidebar from "../components/Sidebar"; // Assuming this component exists

// 🏢 Department and Channel Lists
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
  "Information Technology",
  "Transport Department",
  "Environment and Sustainability",
  "Urban Development",
  "Planning & Coordination",
];

const channels = [
  "#general",
  "#projects",
  "#announcements",
  "#updates",
  "#team-chat",
  "#documents",
  "#support",
];

// 👥 Users
const users = [
  "Sanchita",
  "Priyanshu",
  "Atul",
  "Ritika",
  "Rahul",
  "Pooja",
  "Kiran",
  "Ananya",
  "Mohit",
  "Devika",
  "Laksh",
  "Isha",
];

// 💬 Message Pool (expanded)
const messagesPool = [
  "Please review the latest updates.",
  "Any feedback on the recent changes?",
  "Reminder: Submit your reports by EOD.",
  "Project X completed successfully!",
  "Meeting scheduled for 3 PM sharp.",
  "Team, let's focus on the deadlines.",
  "Make sure all documents are uploaded by tomorrow.",
  "Great work on the new campaign!",
  "We need to coordinate with the finance team.",
  "Client requested a few modifications.",
  "Let's set up a call to finalize the proposal.",
  "Training session scheduled for next Monday.",
  "Budget review will be held next week.",
  "Please update your weekly reports.",
  "Check the shared folder for updated templates.",
];

// 🔧 Message Generator
const generateMessages = (dept, channel) => {
  const msgCount = Math.floor(Math.random() * 10) + 10; // more messages
  return Array.from({ length: msgCount }, (_, i) => {
    const user = users[Math.floor(Math.random() * users.length)];
    return {
      id: `${dept}-${channel}-${i}`,
      author: user,
      avatar: `https://i.pravatar.cc/40?u=${dept}-${i}`,
      message: messagesPool[Math.floor(Math.random() * messagesPool.length)],
      time: new Date(
        Date.now() - Math.floor(Math.random() * 1000000000)
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      replies: [],
    };
  });
};

const DepartmentForum = ({ user, handleLogout }) => {
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [messages, setMessages] = useState(
    generateMessages(departments[0], channels[0])
  );
  const [newMessage, setNewMessage] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const chatEndRef = useRef(null);

  // Regenerate messages when department/channel changes
  useEffect(() => {
    setMessages(generateMessages(selectedDept, selectedChannel));
  }, [selectedDept, selectedChannel]);

  // Scroll to bottom ONLY when "You" send a message
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].author === "You") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: `msg-${Date.now()}`,
      author: "You",
      avatar: `https://i.pravatar.cc/40?u=you-${Date.now()}`,
      message: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      replies: [],
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const handleSendReply = (index) => {
    if (!replyText.trim()) return;
    const newReply = {
      id: `reply-${Date.now()}`,
      user: "You",
      message: replyText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updatedMessages = messages.map((msg, i) => {
      if (i === index) {
        return { ...msg, replies: [...msg.replies, newReply] };
      }
      return msg;
    });
    setMessages(updatedMessages);
    setReplyText("");
    setReplyIndex(null);
  };

  const toggleSidebar = () => setLeftSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      {/* LEFT SIDEBAR */}
      <div
        className={`fixed md:static z-50 h-full transform transition-transform duration-300
          ${leftSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <AdminSidebar />
      </div>

      {/* MOBILE OVERLAY (LEFT SIDEBAR) */}
      {leftSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setLeftSidebarOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full p-4 md:p-6 overflow-hidden">
        {/* HEADER */}
        <div className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLeftSidebarOpen(true)}
              className="md:hidden bg-blue-600 text-white p-2 rounded-full"
            >
              <FaBars />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              Department Forum
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
        <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedDept} {selectedChannel}
          </h2>
          <span className="text-gray-500 text-sm">{messages.length} messages</span>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow p-4 space-y-4 border border-gray-300 custom-scrollbar">
          {messages.map((msg, index) => (
            <div key={msg.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <img src={msg.avatar} alt="" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">{msg.author}</h3>
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
                    onClick={() => {
                      const newIndex = index === replyIndex ? null : index;
                      setReplyIndex(newIndex);
                      setReplyText("");
                    }}
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
        <div className="bg-white p-4 mt-4 rounded-lg shadow flex gap-3 flex-shrink-0">
          <input
            type="text"
            className="flex-1 border rounded px-4 py-2 focus:outline-blue-400"
            placeholder={`Message ${selectedDept}...`}
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
        <div className="border-b flex justify-between items-center bg-gray-50 px-2 py-1">
          <h2 className="text-xl font-bold text-gray-800">Departments</h2>
          <button className="md:hidden" onClick={() => setRightSidebarOpen(false)}>
            <FaChevronRight />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-64px)] custom-scrollbar">
          <h3 className="font-semibold mb-2 mt-2 text-gray-700 px-2">Departments</h3>
          <ul className="space-y-2 mb-4">
            {departments.map((dept) => (
              <li
                key={dept}
                onClick={() => {
                  setSelectedDept(dept);
                  setRightSidebarOpen(false);
                }}
                className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-blue-100 ${
                  selectedDept === dept ? "bg-blue-200 font-semibold" : "text-gray-700"
                }`}
              >
                <FaHashtag /> {dept}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mb-2 text-gray-700 px-2">Channels</h3>
          <ul className="space-y-2">
            {channels.map((ch) => (
              <li
                key={ch}
                onClick={() => {
                  setSelectedChannel(ch);
                  setRightSidebarOpen(false);
                }}
                className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-blue-100 ${
                  selectedChannel === ch ? "bg-blue-200 font-semibold" : "text-gray-700"
                }`}
              >
                {ch}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MOBILE OVERLAY (RIGHT SIDEBAR) */}
      {rightSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setRightSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DepartmentForum;
