import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleCard } from './ArticleCard';
import { Pagination } from './Pagination';
import { Message } from '../message/Message';
import { Nav } from '../nav/Nav';
import { getArticles, getTopics } from '../../api';

export const ArticleList = () => {
  const { topic } = useParams();
  const [topicList, setTopicList] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const articlePerPage = 10;
  const [articleList, setArticleList] = useState([]);
  const [articlesOnThisPage, setArticlesOnThisPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTopicsFailed, setIsLoadingTopicsFailed] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    setIsLoadingTopicsFailed(false);
    const promiseArr = [getTopics(), getArticles({ topic, sortBy, order })];
    Promise.all(promiseArr)
      .then((data) => {
        setIsLoading(false);
        setTopicList(data[0].topics);
        setArticleList(data[1].articles);
        setArticlesOnThisPage(
          data[1].articles.slice(
            (currentPage - 1) * articlePerPage,
            currentPage * articlePerPage
          )
        );
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        if (topic) setIsLoadingTopicsFailed(true);
      });
  }, [topic, sortBy, order]);

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

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
      {isLoading ? <Message message="Loading..." /> : null}
      {isLoadingTopicsFailed ? (
        <Message message="Topic does not exist" />
      ) : null}

      {!isLoading && !isLoadingTopicsFailed ? (
        <>
          <Nav
            topicList={topicList}
            handleSortByChange={handleSortByChange}
            handleOrderChange={handleOrderChange}
          />
          <Pagination
            currentPage={currentPage}
            articlePerPage={articlePerPage}
            articleListLength={articleList.length}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
          <ul id="article-list">
            {articlesOnThisPage.map((article) => {
              return <ArticleCard key={article.article_id} {...article} />;
            })}
          </ul>
        </>
      ) : null}
    </div>
  );
};
