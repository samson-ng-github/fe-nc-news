import { useState, useEffect } from 'react';
import { getArticles } from '../../api';
import { ArticleCard } from './ArticleCard';

export const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    getArticles().then((data) => {
      console.log(data.articles);
      setArticleList(data.articles);
    });
  }, []);

  return (
    <ul id="article-list">
      {articleList.length
        ? articleList.map((article) => {
            return <ArticleCard key={article.article_id} {...article} />;
          })
        : 'Loading...'}
    </ul>
  );
};
