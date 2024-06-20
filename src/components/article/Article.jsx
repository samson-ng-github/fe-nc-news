import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Message } from '../message/Message';
import { CommentCard } from './CommentCard';
import { getArticleByID, getCommentsByArticle, patchVotes } from '../../api';
import { CommentForm } from './CommentForm';

export const Article = () => {
  const [article, setArticle] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [fakeKudos, setFakeKudos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    const promiseArr = [
      getArticleByID(article_id),
      getCommentsByArticle(article_id),
    ];

    Promise.all(promiseArr)
      .then((data) => {
        setArticle(data[0].article);
        setCommentList(data[1].comments);
        setFakeKudos(data[0].article.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsLoadingFailed(true);
      });
  }, [article_id]);

  const handleThumbUp = () => {
    setFakeKudos(fakeKudos + 1);
    patchVotes(article_id, 1).catch((err) => {
      setFakeKudos(fakeKudos - 1);
    });
  };

  const handleThumbDown = () => {
    setFakeKudos(fakeKudos - 1);
    patchVotes(article_id, -1).catch((err) => {
      setFakeKudos(fakeKudos + 1);
    });
  };

  const removeCommentFromList = (comment_id) => {
    setCommentList(
      commentList.filter((comment) => {
        return comment.comment_id !== comment_id;
      })
    );
  };

  return (
    <main>
      {isLoading ? <Message message="Loading..." /> : null}
      {isLoadingFailed ? <Message message="Article does not exist" /> : null}
      {!isLoading && !isLoadingFailed ? (
        <>
          <article id="article">
            <img id="article-img" src={article.article_img_url} alt="" />
            <h2>{article.title}</h2>
            <h3>{article.author}</h3>
            <p className="article-info">
              {`${article.topic.toUpperCase()} • ${article.created_at} • `}
              <button
                className="emoji"
                onClick={handleThumbUp}
                aria-label="like"
              >
                👍
              </button>{' '}
              <button
                className="emoji"
                onClick={handleThumbDown}
                aria-label="dislike"
              >
                👎
              </button>{' '}
              {`${fakeKudos}`}
            </p>
            <p>{article.body}</p>
          </article>

          <CommentForm
            article_id={article_id}
            setCommentList={setCommentList}
          />

          {commentList.map((comment) => {
            return (
              <CommentCard
                key={comment.comment_id}
                {...comment}
                removeCommentFromList={removeCommentFromList}
              />
            );
          })}
        </>
      ) : null}
    </main>
  );
};
