import { Link } from 'react-router-dom';

export const ArticleCard = (props) => {
  const { article_id, title, topic, created_at, votes, article_img_url } =
    props;
  return (
    <li className="article-card">
      <Link to={`/nc-news/articles/${article_id}`}>
        <img className="article-card-img" src={article_img_url} alt="" />
        <h2>{title}</h2>
        <p className="article-info">{`${topic.toUpperCase()} • ${created_at}`}</p>
        <p className="article-info">
          <span aria-label="like">👍</span> <span aria-label="dislike">👎</span>{' '}
          {votes}
        </p>
      </Link>
    </li>
  );
};
