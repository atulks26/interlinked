import React, { useState } from 'react';
import "../styles/ForumHeader.css";

const ForumHeader = () => {
  const [sort, setSort] = useState('title');
  const [order, setOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="forum-header">
      <div className="header-content">
        <div className="search-bar">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search topics..."
          />
        </div>
        <div className="sort-options">
          <label>Sort by:</label>
          <select value={sort} onChange={handleSortChange}>
            <option value="title">Title</option>
            <option value="replies">Replies</option>
            <option value="views">Views</option>
            <option value="date">Date</option>
          </select>
          <label>Order:</label>
          <select value={order} onChange={handleOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ForumHeader;
