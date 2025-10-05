import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/TopicDetail.css';
import pp from '../images/profile.png';

const TopicDetail = () => {
  const { id } = useParams();

  // Updated mock data with Indian names for topics and replies
  const topicDetails = {
    1: {
      title: 'Due to building construction, pollution levels are rising',
      content: 'This topic discusses the impact of building construction on pollution levels. Share your thoughts and experiences...',
      replies: [
        { user: 'Ravi Kumar', dp: pp , reply: 'I’ve noticed a significant increase in pollution around the construction sites. The air feels heavier and more polluted.' },
        { user: 'Aisha Patel', dp: pp , reply: 'The dust and fumes from construction are definitely affecting my respiratory health. I’ve started wearing a mask when going outside.' },
        { user: 'Arjun Singh', dp: pp , reply: 'I’ve seen reports that construction dust can increase the risk of respiratory problems, especially for people with pre-existing conditions.' },
      ],
    },
    2: {
      title: 'Roads are damaged due to ongoing construction',
      content: 'Discuss the current state of roads affected by construction work. Share any issues you’ve encountered...',
      replies: [
        { user: 'Vikram Reddy', dp: pp , reply: 'Many roads are in terrible condition due to ongoing construction. Potholes are becoming a major problem, causing damage to vehicles.' },
        { user: 'Meera Sharma', dp: pp , reply: 'I’ve had to change my route multiple times because of the poor road conditions. It’s causing delays and frustration.' },
        { user: 'Rajesh Gupta', dp: pp, reply: 'The construction work is impacting traffic flow significantly. I hope the roads will be repaired soon to alleviate the congestion.' },
      ],
    },
    3: {
      title: 'Frequent power outages are disrupting daily life',
      content: 'Power outages have become a frequent issue in our area. How are they affecting your daily life, and what measures have you taken?',
      replies: [
        { user: 'Sneha Kapoor', dp: pp , reply: 'The frequent power outages are really disrupting my work-from-home setup. I’ve had to invest in a backup generator.' },
        { user: 'Rohan Desai', dp: pp , reply: 'I’ve experienced multiple outages during peak hours. It’s affecting my online meetings and daily chores.' },
        { user: 'Anita Rao', dp: pp , reply: 'I’ve started using rechargeable lamps and keeping my phone charged as a precaution. It’s been quite inconvenient.' },
      ],
    },
    4: {
      title: 'High grocery prices are stretching budgets',
      content: 'Grocery prices have been rising steadily. How are you managing your budget, and what changes have you made to your shopping habits?',
      replies: [
        { user: 'Sandeep Agarwal', dp: pp , reply: 'I’ve started buying in bulk and focusing on seasonal produce to save money. It’s made a noticeable difference.' },
        { user: 'Priya Nair', dp: pp , reply: 'I’m comparing prices across different stores and using discount coupons more frequently. It’s been helpful.' },
        { user: 'Kiran Patel', dp: pp , reply: 'I’ve cut down on non-essential items and started meal planning to better manage my grocery expenses.' },
      ],
    },
    5: {
      title: 'Long commutes are affecting work-life balance',
      content: 'Many people are struggling with long commutes. How is it impacting your work-life balance, and what solutions have you found?',
      replies: [
        { user: 'Neha Singh', dp: pp , reply: 'My long commute is taking a toll on my personal time. I’m exploring remote work options to improve my work-life balance.' },
        { user: 'Amit Sharma', dp: pp , reply: 'I’ve started carpooling with colleagues to reduce travel time and expenses. It’s been a bit of a relief.' },
        { user: 'Pooja Verma', dp: pp , reply: 'I’ve adjusted my work hours to avoid peak traffic times. It has helped me save some time each day.' },
      ],
    },
  };

  const topic = topicDetails[id];

  const [comment, setComment] = useState('');
  const [replies, setReplies] = useState(topic?.replies || []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      const newReply = {
        user: 'Current User',  // Simulate logged-in user
        dp: pp,  // Placeholder DP
        reply: comment,
      };
      setReplies([newReply, ...replies]);  // Add new reply to the list
      setComment('');  // Clear comment box
    }
  };

  return (
    <div className="topic-detail">
      <h1>{topic?.title}</h1>
      <p>{topic?.content}</p>

      <div className="comment-section">
        <h3>Replies</h3>
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
      </div>

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          placeholder="Write a reply..."
          value={comment}
          onChange={handleCommentChange}
        />
        <button type="submit">Post Reply</button>
      </form>
    </div>
  );
};

export default TopicDetail;
