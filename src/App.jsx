import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { ArticleList } from './components/articles/ArticleList';
import { Article } from './components/articles/Article';
import './App.css';

function App() {
  return (
    <main>
      <header>
        <Link to={'/'}>
          <h1>NC News</h1>
        </Link>
      </header>
      <nav>Nav</nav>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;
