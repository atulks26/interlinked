import React from 'react';
import ForumHeader from '../components/ForumHeader';
import ForumTopicList from '../components/ForumTopicList';
import Pagination from '../components/Pagination';

const Forum = () => {
  return (
    <div className="forum-container">
      <ForumHeader />
      <ForumTopicList />
      <Pagination />
    </div>
  );
};

export default Forum;
