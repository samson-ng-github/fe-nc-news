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

  useEffect(() => {
    getTopics().then((data) => {
      setTopicList(data.topics);
      setIsLoadingTopicList(false);
    });
  }, []);

  return (
    <main>
      <header>
        <Link to={'/'}>
          <h1>NC News</h1>
        </Link>
      </header>
      {isLoadingTopicList ? null : <Nav topicList={topicList} />}
      <Routes>
        <Route path="/" element={<ArticleList />} />

        {topicList.map((topic) => {
          return (
            <Route
              key={topic.slug}
              path={`/${topic.slug}`}
              element={<ArticleList topic={topic.slug} />}
            />
          );
        })}
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;
