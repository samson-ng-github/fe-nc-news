import { Routes, Route, Link } from 'react-router-dom';
import { ArticleList } from './components/article-list/ArticleList';
import { Article } from './components/article/Article';
import { Message } from './components/general/Message';
import { Account } from './components/general/Account';
import './App.css';

function App() {
  return (
    <main>
      <Account />
      <header>
        <Link to='/nc-news'>
          <h1>NC News</h1>
        </Link>
      </header>

      <Routes>
        <Route path="/nc-news/" element={<ArticleList />} />
        <Route path="/nc-news/topics/:topic" element={<ArticleList />} />
        <Route path="/nc-news/articles/:article_id" element={<Article />} />
        <Route
          path="/nc-news/*"
          element={<Message message={'Page does not exist'} />}
        />
      </Routes>
    </main>
  );
}

export default App;
