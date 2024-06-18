import { useState, useEffect } from 'react';
import { getArticles } from '../../api';
import { ArticleCard } from './ArticleCard';

export const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [isArticleListLoading, setIsArticleListLoading] = useState(true);

  useEffect(() => {
    getArticles().then((data) => {
      setArticleList(data.articles);
      setIsArticleListLoading(false);
    });
  }, []);

  return (
    <div>
      {isArticleListLoading ? (
        <h2 className="loading-message">Loading articles...</h2>
      ) : null}
      {isArticleListLoading ? null : (
        <ul id="article-list">
          {articleList.map((article) => {
            return <ArticleCard key={article.article_id} {...article} />;
          })}
        </ul>
      )}
    </div>
  );
};
