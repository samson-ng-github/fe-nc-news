import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleCard } from './ArticleCard';
import { Pagination } from './Pagination';
import { Message } from '../general/Message';
import { Nav } from './Nav';
import { getArticles, getTopics } from '../../api';

export const ArticleList = () => {
  const { topic } = useParams();
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [topicList, setTopicList] = useState([]);
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
        setArticlesOnThisPage(data[1].articles.slice(0, 10));
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        if (topic) setIsLoadingTopicsFailed(true);
      });
  }, [topic, sortBy, order]);

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
            setSortBy={setSortBy}
            setOrder={setOrder}
          />
          <Pagination
            currentPage={currentPage}
            articleList={articleList}
            setCurrentPage={setCurrentPage}
            setArticlesOnThisPage={setArticlesOnThisPage}
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
