import { Link } from 'react-router-dom';

export const ArticleCard = (props) => {
  const { article_id, title, topic, created_at, votes, article_img_url } =
    props;
  return (
    <li className="article-card">
      <Link to={`/articles/${article_id}`}>
        <img className="article-card-img" src={article_img_url} />
        <h2>{title}</h2>
        <p className="article-info">{`${topic.toUpperCase()} • ${created_at}`}</p>
        <p className="article-info">👍 {votes}</p>
      </Link>
    </li>
  );
};
