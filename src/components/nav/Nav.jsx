import { useState, useEffect } from 'react';
import { getTopics } from '../../api';
import { Link } from 'react-router-dom';

export const Nav = ({ topicList, handleSortByChange, handleOrderChange }) => {
  return (
    <nav>
      <ul id="topic-list">
        {topicList.map((topic) => {
          return (
            <li className="topic" key={topic.slug}>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>
      <form>
        <label>
          Sort by:{' '}
          <select onChange={handleSortByChange}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
            <option value="title">Title</option>
          </select>
        </label>
      </form>
      <form>
        <label>
          Order by:{' '}
          <select onChange={handleOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </form>
    </nav>
  );
};
