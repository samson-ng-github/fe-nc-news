import { useState, useEffect } from 'react';
import { getArticles } from '../../api';
import { ArticleCard } from './ArticleCard';
import { useParams } from 'react-router-dom';

export const ArticleList = ({ sortBy, order }) => {
  const [articleList, setArticleList] = useState([]);
  const [isArticleListLoading, setIsArticleListLoading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    getArticles({ topic, sortBy, order }).then((data) => {
      setArticleList(data.articles);
      setIsArticleListLoading(false);
    });
  }, [topic, sortBy, order]);

  return (
    <div>
      {isArticleListLoading ? (
        <h2 className="loading-message">Loading articles...</h2>
      ) : (
        <ul id="article-list">
          {articleList.map((article) => {
            return <ArticleCard key={article.article_id} {...article} />;
          })}
        </ul>
      )}
    </div>
  );
};
