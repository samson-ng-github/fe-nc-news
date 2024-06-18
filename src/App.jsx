import { Routes, Route, Link } from 'react-router-dom';
import { ArticleList } from './components/articles/ArticleList';
import { Article } from './components/articles/Article';
import { Message } from './components/message/Message';
import './App.css';

function App() {
  return (
    <main>
      <header>
        <Link to={'/'}>
          <h1>NC News</h1>
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/topics/:topic" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="*" element={<Message message={'Page does not exist'} />} />
      </Routes>
    </main>
  );
}

export default App;
