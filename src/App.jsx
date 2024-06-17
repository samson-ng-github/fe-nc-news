import { useState, useEffect } from 'react';
import { getArticles } from './api';
import './App.css';

function App() {
  return (
    <main>
      <header>
        <h1>NC News</h1>
      </header>
      <nav>Nav</nav>
      <ArticleList />
    </main>
  );
}

const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    getArticles().then((data) => {
      console.log(data.articles);
      setArticleList(data.articles);
    });
  }, []);

  return (
    <ul id="article-list">
      {articleList
        ? articleList.map((article) => {
            return <ArticleCard {...article} />;
          })
        : 'Loading...'}
    </ul>
  );
};

const ArticleCard = (props) => {
  const { title, topic, author, created_at, votes, article_img_url } = props;
  return (
    <li className="article-card">
      <img className="article-img" src={article_img_url} />
      <h2>{title}</h2>
      <p className="article-info">{`${topic.toUpperCase()} • ${created_at}`}</p>
      <p>👍 {votes}</p>
    </li>
  );
};

export default App;
