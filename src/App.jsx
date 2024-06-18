import { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { ArticleList } from './components/articles/ArticleList';
import { Article } from './components/articles/Article';
import { Nav } from './components/nav/Nav';
import { getTopics } from './api';

import './App.css';

function App() {
  const [topicList, setTopicList] = useState([]);
  const [isLoadingTopicList, setIsLoadingTopicList] = useState(true);
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    getTopics().then((data) => {
      setTopicList(data.topics);
      setIsLoadingTopicList(false);
    });
  }, []);

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    console.log(e.target.value);
  };

  return (
    <main>
      <header>
        <Link to={'/'}>
          <h1>NC News</h1>
        </Link>
      </header>
      {isLoadingTopicList ? null : (
        <Nav
          topicList={topicList}
          handleSortByChange={handleSortByChange}
          handleOrderChange={handleOrderChange}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<ArticleList sortBy={sortBy} order={order} />}
        />
        <Route
          path="/topics/:topic"
          element={<ArticleList sortBy={sortBy} order={order} />}
        />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;
