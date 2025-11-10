import React, { useState, useEffect, useRef, useContext } from "react"; // Import useContext
import {
  FaPaperPlane,
  FaReply,
  FaHashtag,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/userContext"; // Import UserContext
import { db } from "../context/firebase"; // Import db
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"; // Import firestore functions

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

// Removed local user/message pools

const InterDepartmentForum = () => {
  const { user } = useContext(UserContext); // Get current user
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [messages, setMessages] = useState([]); // Default to empty array
  const [newMessage, setNewMessage] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState("");
  const chatEndRef = useRef(null);

  // Fetch messages from Firestore on component mount and when dept/channel changes
  useEffect(() => {
    if (!selectedDept || !selectedChannel) return;

    // Define the collection path
    const messagesRef = collection(
      db,
      "inter-department-chats",
      selectedDept,
      selectedChannel,
      "messages"
    );
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Convert firestore timestamp to JS Date, then toLocaleTimeString
        time: doc.data().timestamp?.toDate().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setMessages(msgs);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [selectedDept, selectedChannel]); // Re-run when these change

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    const msg = {
      author: user.user_name || "You", // Use logged-in user's name
      avatar: `https://i.pravatar.cc/40?u=${user.userId}`, // Use user ID for consistent avatar
      message: newMessage,
      timestamp: serverTimestamp(), // Use server timestamp
      replies: [],
    };

    // Add new message to the correct firestore collection
    const messagesRef = collection(
      db,
      "inter-department-chats",
      selectedDept,
      selectedChannel,
      "messages"
    );
    await addDoc(messagesRef, msg);
    setNewMessage(""); // Clear input
  };

  const handleSendReply = async (index) => {
    if (!replyText.trim() || !user) return;
    
    const messageToReply = messages[index];
    if (!messageToReply || !messageToReply.id) return; // Ensure we have a firestore doc ID

    // Define the document path
    const msgDocRef = doc(
      db,
      "inter-department-chats",
      selectedDept,
      selectedChannel,
      "messages",
      messageToReply.id
    );

    const newReply = {
      id: `reply-${Date.now()}`,
      user: user.user_name || "You",
      message: replyText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Atomically add the new reply to the 'replies' array in Firestore
    await updateDoc(msgDocRef, {
      replies: arrayUnion(newReply),
    });

    setReplyText("");
    setReplyIndex(null);
  };

  return (
    <div className="flex">
      {/* ✅ Sidebar same as ManageJunior */}
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
                    {/* Changed msg.department to msg.author */}
                    <h3 className="font-semibold text-gray-800">{msg.author}</h3>
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