import { useState, useEffect } from 'react';
import { getArticles } from '../../api';
import { ArticleCard } from './ArticleCard';
import { useParams } from 'react-router-dom';
import { Pagination } from './Pagination';

export const ArticleList = ({ sortBy, order }) => {
  const [articleList, setArticleList] = useState([]);
  const [articlesOnThisPage, setArticlesOnThisPage] = useState([]);
  const [isArticleListLoading, setIsArticleListLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlePerPage, setArticlePerPage] = useState(10);
  const { topic } = useParams();

  useEffect(() => {
    setCurrentPage(1);
    getArticles({ topic, sortBy, order }).then((data) => {
      setArticleList(data.articles);
      console.log(data.articles.length);
      setArticlesOnThisPage(
        data.articles.slice(
          (currentPage - 1) * articlePerPage,
          currentPage * articlePerPage
        )
      );

      setIsArticleListLoading(false);
    });
  }, [topic, sortBy, order]);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    setArticlesOnThisPage(
      articleList.slice(
        currentPage * articlePerPage,
        (currentPage + 1) * articlePerPage
      )
    );
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    setArticlesOnThisPage(
      articleList.slice(
        (currentPage - 2) * articlePerPage,
        (currentPage - 1) * articlePerPage
      )
    );
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        articlePerPage={articlePerPage}
        articleList={articleList}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      {isArticleListLoading ? (
        <h2 className="loading-message">Loading articles...</h2>
      ) : (
        <ul id="article-list">
          {articlesOnThisPage.map((article) => {
            return <ArticleCard key={article.article_id} {...article} />;
          })}
        </ul>
      )}
    </div>
  );
};
