import React, { useState } from "react";
import "../styles/Forum.css";
import pp from "../images/profile.png";

const Forum = () => {
  const [sort, setSort] = useState("title");
  const [order, setOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [comment, setComment] = useState("");

  const topicsPerPage = 5;

  const topics = [
    { id: 1, title: "Due to building construction, pollution levels are rising", replies: 15, views: 764, lastPost: "Sep 10, 2024" },
    { id: 2, title: "Roads are damaged due to ongoing construction", replies: 30, views: 634, lastPost: "Sep 9, 2024" },
    { id: 3, title: "Frequent power outages are disrupting daily life", replies: 12, views: 540, lastPost: "Sep 8, 2024" },
    { id: 4, title: "High grocery prices are stretching budgets", replies: 22, views: 590, lastPost: "Sep 7, 2024" },
    { id: 5, title: "Long commutes are affecting work-life balance", replies: 18, views: 450, lastPost: "Sep 6, 2024" },
    { id: 6, title: "Urban planning issues causing traffic jams", replies: 10, views: 320, lastPost: "Sep 5, 2024" },
    { id: 7, title: "Lack of public green spaces in the city", replies: 14, views: 280, lastPost: "Sep 4, 2024" },
  ];

  const topicDetails = {
    1: {
      content: "This topic discusses the impact of building construction on pollution levels. Share your thoughts and experiences...",
      replies: [
        { user: "Ravi Kumar", dp: pp, reply: "Pollution around construction sites has increased a lot." },
        { user: "Aisha Patel", dp: pp, reply: "Dust and fumes are affecting health; masks are essential now." },
      ],
    },
    2: {
      content: "Discuss the current state of roads affected by construction work.",
      replies: [
        { user: "Vikram Reddy", dp: pp, reply: "Potholes everywhere! Vehicles getting damaged." },
        { user: "Meera Sharma", dp: pp, reply: "I’ve had to take longer routes every day." },
      ],
    },
  };

  // Sorting & filtering
  const filteredTopics = topics
    .filter((topic) => topic.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      let compA = a[sort];
      let compB = b[sort];
      if (typeof compA === "string") compA = compA.toLowerCase();
      if (typeof compB === "string") compB = compB.toLowerCase();
      if (compA < compB) return order === "asc" ? -1 : 1;
      if (compA > compB) return order === "asc" ? 1 : -1;
      return 0;
    });

  const indexOfLast = currentPage * topicsPerPage;
  const indexOfFirst = indexOfLast - topicsPerPage;
  const currentTopics = filteredTopics.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTopics.length / topicsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  // Comment submission inside topic detail
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment && selectedTopic) {
      const newReply = { user: "Current User", dp: pp, reply: comment };
      topicDetails[selectedTopic.id].replies.unshift(newReply);
      setComment("");
    }
  };

  return (
    <div className="forum-container p-5 sm:p-10 max-w-6xl mx-auto">
      {!selectedTopic ? (
        <>
          {/* Forum Header */}
          <div className="forum-header flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-800">Urban Forum</h1>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-full py-2 px-4 w-full sm:w-64"
              />
              <div className="flex items-center space-x-2">
                <label>Sort by:</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded px-2 py-1">
                  <option value="title">Title</option>
                  <option value="replies">Replies</option>
                  <option value="views">Views</option>
                  <option value="lastPost">Date</option>
                </select>
                <select value={order} onChange={(e) => setOrder(e.target.value)} className="border rounded px-2 py-1">
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
              </div>
            </div>
          </div>

          {/* Topics Table */}
          <div className="forum-topic-list overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4">Replies</th>
                  <th className="py-2 px-4">Views</th>
                  <th className="py-2 px-4">Last Post</th>
                </tr>
              </thead>
              <tbody>
                {currentTopics.map((topic) => (
                  <tr
                    key={topic.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <td className="py-2 px-4 text-blue-700 hover:underline">{topic.title}</td>
                    <td className="text-center">{topic.replies}</td>
                    <td className="text-center">{topic.views}</td>
                    <td className="text-center">{topic.lastPost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination flex justify-center mt-6 space-x-2 flex-wrap">
            <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Topic Detail Section */}
          <button onClick={() => setSelectedTopic(null)} className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            ← Back to Topics
          </button>

          <div className="topic-detail bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">{selectedTopic.title}</h2>
            <p className="mb-6">{topicDetails[selectedTopic.id]?.content}</p>

            <h3 className="text-xl font-bold mb-3">Replies</h3>
            <div className="space-y-4 mb-6">
              {topicDetails[selectedTopic.id]?.replies.map((reply, i) => (
                <div key={i} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg">
                  <img src={reply.dp} alt={reply.user} className="w-10 h-10 rounded-full" />
                  <div>
                    <strong>{reply.user}</strong>
                    <p>{reply.reply}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-3">
              <textarea
                placeholder="Write a reply..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border rounded-lg p-2"
              />
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Post Reply
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Forum;
