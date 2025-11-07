import React, { useState } from "react";
import "../styles/Forum.css";
import pp from "../images/profile.png";

const Forum = () => {
  const [topics, setTopics] = useState([
    { id: 1, title: "Due to building construction, pollution levels are rising", replies: 3, date: "2024-07-01" },
    { id: 2, title: "Roads are damaged due to ongoing construction", replies: 3, date: "2024-07-02" },
    { id: 3, title: "Frequent power outages are disrupting daily life", replies: 3, date: "2024-07-03" },
    { id: 4, title: "High grocery prices are stretching budgets", replies: 3, date: "2024-07-04" },
    { id: 5, title: "Long commutes are affecting work-life balance", replies: 3, date: "2024-07-05" },
  ]);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);

  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");

  const [replies, setReplies] = useState([]);
  const [comment, setComment] = useState("");

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setReplies([
      { user: "Ravi Kumar", dp: pp, reply: "I agree with this point completely." },
      { user: "Aisha Patel", dp: pp, reply: "This needs urgent attention by local authorities." },
    ]);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      const newReply = {
        user: "Current User",
        dp: pp,
        reply: comment,
      };
      setReplies([newReply, ...replies]);
      setComment("");
    }
  };

  const handleCreateThread = (e) => {
    e.preventDefault();
    if (newThreadTitle.trim() && newThreadContent.trim()) {
      const newTopic = {
        id: topics.length + 1,
        title: newThreadTitle,
        replies: 0,
        date: new Date().toISOString().split("T")[0],
      };
      setTopics([newTopic, ...topics]);
      setNewThreadTitle("");
      setNewThreadContent("");
      setShowNewThreadForm(false);
    }
  };

  return (
    <div className="forum-page">
      {!selectedTopic ? (
        <>
          <div className="forum-header">
            <h1>Community Forum</h1>
            <button className="create-thread-btn" onClick={() => setShowNewThreadForm(true)}>
              + Create New Thread
            </button>
          </div>

          <div className="forum-topic-list">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Replies</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic.id} onClick={() => handleTopicSelect(topic)}>
                    <td>{topic.title}</td>
                    <td>{topic.replies}</td>
                    <td>{topic.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for New Thread */}
          {showNewThreadForm && (
            <div className="modal-overlay" onClick={() => setShowNewThreadForm(false)}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
              >
                <h2>Create New Thread</h2>
                <form onSubmit={handleCreateThread}>
                  <input
                    type="text"
                    placeholder="Enter thread title..."
                    value={newThreadTitle}
                    onChange={(e) => setNewThreadTitle(e.target.value)}
                  />
                  <textarea
                    placeholder="Write your content here..."
                    value={newThreadContent}
                    onChange={(e) => setNewThreadContent(e.target.value)}
                  />
                  <div className="form-actions">
                    <button type="submit" className="submit-btn">Post Thread</button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowNewThreadForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="topic-detail">
          <button className="back-btn" onClick={() => setSelectedTopic(null)}>
            ← Back to Topics
          </button>
          <h2>{selectedTopic.title}</h2>
          <p className="topic-desc">
            Discussion thread on <strong>{selectedTopic.title}</strong>. Feel free to share your views below.
          </p>

          <div className="comment-section">
            <h3>Replies</h3>
            {replies.length === 0 ? (
              <p className="no-replies">No replies yet. Be the first to comment!</p>
            ) : (
              <div className="replies-container">
                {replies.map((reply, index) => (
                  <div className="reply" key={index}>
                    <img src={reply.dp} alt={reply.user} className="user-dp" />
                    <div className="reply-content">
                      <strong>{reply.user}:</strong>
                      <p>{reply.reply}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              placeholder="Write a reply..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Post Reply</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Forum;
