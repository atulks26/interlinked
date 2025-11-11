import React, { useState, useEffect, useRef, useContext } from "react";
import {
  FaPaperPlane,
  FaReply,
  FaChevronRight,
  FaHashtag,
  FaBars,
} from "react-icons/fa";
import AdminSidebar from "../components/Sidebar";
import { UserContext } from "../context/userContext";
import { db } from "../context/firebase";
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
  getDocs,
} from "firebase/firestore";

const TOXICITY_THRESHOLD = 0.7;

const checkToxicity = async (text) => {
    if (!text) {
        console.warn("Perspective API key not set or text is empty. Skipping check.");
        return false; 
    }
    const API_URL = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.PERSPECTIVE_API_KEY}`;
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                comment: { text: text },
                languages: ["en"],
                requestedAttributes: { TOXICITY: {} },
            }),
        });
        if (!response.ok) {
            throw new Error(`Perspective API error: ${response.statusText}`);
        }
        const data = await response.json();
        const toxicityScore = data.attributeScores.TOXICITY.summaryScore.value;
        console.log("Toxicity Score:", toxicityScore);
        return toxicityScore > TOXICITY_THRESHOLD;
    } catch (error) {
        console.error("Error calling Perspective API:", error);
        return false;
    }
};

const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
};

const DepartmentForum = () => {
  const { user } = useContext(UserContext);

  const [departments, setDepartments] = useState([]);
  const [channels] = useState(["general", "projects", "announcements", "updates"]);
  
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState("general");
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const chatEndRef = useRef(null);

  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
        try {
            const deptCollectionRef = collection(db, "departments");
            const snapshot = await getDocs(deptCollectionRef);
            const deptList = snapshot.docs.map(doc => doc.data().departmentName);
            setDepartments(deptList);
            if (deptList.length > 0) {
                setSelectedDept(deptList[0]);
            }
        } catch (error) {
            console.error("Error fetching departments: ", error);
        }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (!selectedDept || !selectedChannel) return;
    const messagesRef = collection(
      db,
      "chat-channels",
      selectedDept,
      selectedChannel
    );

    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        time: doc.data().timestamp?.toDate().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedDept, selectedChannel]);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].authorName === user?.user_name) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, user?.user_name]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || isPosting || !selectedDept || !selectedChannel) return;
    setIsPosting(true);

    const isToxic = await checkToxicity(newMessage);
    if (isToxic) {
        alert("Your message was flagged for hateful content and was not posted. Please revise and try again.");
        setIsPosting(false);
        return;
    }

    const msg = {
      authorName: user.user_name || "Anonymous",
      authorId: user.userId || null,
      authorDept: user.department ? capitalizeWords(user.department) : "Unknown Dept",
      authorRole: user.role ? capitalizeWords(user.role) : "User",
      avatar: `https://i.pravatar.cc/40?u=${user.userId}`,
      message: newMessage,
      timestamp: serverTimestamp(),
      replies: [],
    };

    try {
      const messagesRef = collection(db, "chat-channels", selectedDept, selectedChannel);

      await addDoc(messagesRef, msg);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
      alert("Failed to send message.");
    }
    setIsPosting(false);
  };

  const handleSendReply = async (index) => {
    if (!replyText.trim() || !user || isPosting || !selectedDept || !selectedChannel) return;
    setIsPosting(true);

    const isToxic = await checkToxicity(replyText);
    if (isToxic) {
        alert("Your reply was flagged for hateful content and was not posted. Please revise and try again.");
        setIsPosting(false);
        return;
    }

    const messageToReply = messages[index];
    if (!messageToReply || !messageToReply.id) return;

    const msgDocRef = doc(db, "chat-channels", selectedDept, selectedChannel, messageToReply.id);

    const newReply = {
      id: `reply-${Date.now()}`,
      user: user.user_name || "You",
      message: replyText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      await updateDoc(msgDocRef, {
        replies: arrayUnion(newReply),
      });
      setReplyText("");
      setReplyIndex(null);
    } catch (error) {
      console.error("Error sending reply: ", error);
      alert("Failed to send reply.");
    }
    setIsPosting(false);
  };

  const toggleSidebar = () => setLeftSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      <div
        className={`fixed md:static z-50 h-full transform transition-transform duration-300
          ${leftSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <AdminSidebar />
      </div>

      {leftSidebarOpen && (<div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setLeftSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col h-full p-4 md:p-6 overflow-hidden">
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

        <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedDept ? `${selectedDept} - #${selectedChannel}` : "Loading..."}
          </h2>
          <span className="text-gray-500 text-sm">{messages.length} messages</span>
        </div>

        <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow p-4 space-y-4 border border-gray-300 custom-scrollbar">
          {messages.map((msg, index) => (
            <div key={msg.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <img src={msg.avatar} alt="" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold text-gray-800">{msg.authorName}</h3>
                        <span className="text-xs text-gray-500">
                          {msg.authorRole} - {msg.authorDept}
                        </span>
                    </div>
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
                        onKeyDown={(e) => e.key === "Enter" && !isPosting && handleSendReply(index)}
                      />
                      <button
                        onClick={() => handleSendReply(index)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        disabled={isPosting}
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

        <div className="bg-white p-4 mt-4 rounded-lg shadow flex gap-3 flex-shrink-0">
          <input
            type="text"
            className="flex-1 border rounded px-4 py-2 focus:outline-blue-400"
            placeholder={selectedDept ? `Message ${selectedDept}...` : "Select a department"}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isPosting && handleSendMessage()}
            disabled={!selectedDept || isPosting}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            disabled={!selectedDept || isPosting}
          >
            {isPosting ? "..." : <FaPaperPlane />}
          </button>
        </div>
      </div>

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
                #{ch}
              </li>
            ))}
          </ul>
        </div>
      </div>

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