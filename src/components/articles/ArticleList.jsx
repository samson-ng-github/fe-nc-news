import { useState, useEffect } from 'react';
import { getArticles } from '../../api';
import { ArticleCard } from './ArticleCard';

export const ArticleList = ({ topic }) => {
  const [articleList, setArticleList] = useState([]);
  const [isArticleListLoading, setIsArticleListLoading] = useState(true);

  useEffect(() => {
    getArticles(topic).then((data) => {
      setArticleList(data.articles);
      setIsArticleListLoading(false);
    });
  }, [topic]);

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
