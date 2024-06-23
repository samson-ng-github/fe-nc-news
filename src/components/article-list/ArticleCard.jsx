import { Link } from 'react-router-dom';
import thumbUp from '../../assets/thumb-up.png';
import thumbDown from '../../assets/thumb-down.png';

export const ArticleCard = (props) => {
  const { article_id, title, topic, created_at, votes, article_img_url } =
    props;
  return (
    <li className="article-card">
      <Link to={`/nc-news/articles/${article_id}`}>
        <img className="article-card-img" src={article_img_url} alt="" />
        <h2>{title}</h2>
        <p className="article-info">
          {`${topic.charAt(0).toUpperCase() + topic.slice(1)} • ${created_at} • `}
          <span className="material-symbols-outlined">thumb_up</span>
          {` ${votes} `}
          <span className="material-symbols-outlined">thumb_down</span>
        </p>
      </Link>
    </li>
  );
};
