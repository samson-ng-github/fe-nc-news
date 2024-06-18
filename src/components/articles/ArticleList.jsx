import { useState, useEffect } from 'react';
import { getArticles } from '../../api';
import { ArticleCard } from './ArticleCard';
import { useParams } from 'react-router-dom';

export const ArticleList = ({ sortBy, order }) => {
  const [articleList, setArticleList] = useState([]);
  const [articlesOnThisPage, setArticlesOnThisPage] = useState([]);
  const [isArticleListLoading, setIsArticleListLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlePerPage, setArticlePerPage] = useState(10);
  const { topic } = useParams();

  useEffect(() => {
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

const Pagination = (props) => {
  const {
    currentPage,
    articlePerPage,
    articleList,
    handleNext,
    handlePrevious,
  } = props;
  return (
    <section id="pagination">
      {currentPage === 1 ? null : (
        <button onClick={handlePrevious} className="pagination-button">
          Previous
        </button>
      )}
      Page {currentPage} of {Math.ceil(articleList.length / articlePerPage)}
      {currentPage === Math.ceil(articleList.length / articlePerPage) ? null : (
        <button onClick={handleNext} className="pagination-button">
          Next
        </button>
      )}
    </section>
  );
};
