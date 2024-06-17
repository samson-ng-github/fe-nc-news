import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleByID } from '../../api';

export const Article = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();
  console.log(article_id);

  useEffect(() => {
    getArticleByID(article_id).then((data) => {
      console.log(data.article);
      setArticle(data.article);
    });
  }, []);

  return (
    <article id="article">
      {Object.keys(article).length ? (
        <div>
          <img id="article-img" src={article.article_img_url} />
          <h2>{article.title}</h2>
          <h3>{article.author}</h3>
          <p className="article-info">{`${article.topic.toUpperCase()} • ${
            article.created_at
          } • 👍 ${article.votes}`}</p>
          <p>{article.body}</p>
        </div>
      ) : (
        'Loading...'
      )}
    </article>
  );
};
