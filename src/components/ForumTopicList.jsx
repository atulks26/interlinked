import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/ForumTopicList.css";

const ForumTopicList = () => {
  const topics = [
    { id: 1, title: 'Due to building construction, pollution levels are rising', replies: 15, views: 764, lastPost: 'Sep 10, 2024' },
    { id: 2, title: 'Roads are damaged due to ongoing construction', replies: 30, views: 634, lastPost: 'Sep 9, 2024' },
    { id: 3, title: 'Frequent power outages are disrupting daily life', replies: 12, views: 540, lastPost: 'Sep 8, 2024' },
    { id: 4, title: 'High grocery prices are stretching budgets', replies: 22, views: 590, lastPost: 'Sep 7, 2024' },
    { id: 5, title: 'Long commutes are affecting work-life balance', replies: 18, views: 450, lastPost: 'Sep 6, 2024' }
  ];

  return (
    <div className="forum-topic-list">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Replies</th>
            <th>Views</th>
            <th>Last Post</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
            <tr key={topic.id}>
              <td>
                <Link to={`/forum/topic/${topic.id}`}>{topic.title}</Link>
              </td>
              <td>{topic.replies}</td>
              <td>{topic.views}</td>
              <td>{topic.lastPost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForumTopicList;
