import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Message } from '../general/Message';
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
    <>
      {isLoading ? <Message message="Loading..." /> : null}
      {isLoadingFailed ? <Message message="Article does not exist" /> : null}
      <main>
        {!isLoading && !isLoadingFailed ? (
          <>
            <article id="article">
              <h1>{article.title}</h1>
              <img id="article-img" src={article.article_img_url} alt="" />
              <p className="article-info">
                {`${
                  article.topic.charAt(0).toUpperCase() + article.topic.slice(1)
                } • ${article.created_at} • `}
                <button onClick={handleThumbUp}>
                  <span className="material-symbols-outlined" aria-label="like">
                    thumb_up
                  </span>
                </button>{' '}
                {` ${fakeKudos} `}
                <button onClick={handleThumbDown}>
                  <span
                    className="material-symbols-outlined"
                    aria-label="dislike"
                  >
                    thumb_down
                  </span>
                </button>{' '}
              </p>
              <h3>{article.author}</h3>
              <p>{article.body}</p>
              <CommentForm
                article_id={article_id}
                setCommentList={setCommentList}
              />
            </article>

            <section id="comment-section">
              {commentList.map((comment) => {
                return (
                  <CommentCard
                    key={comment.comment_id}
                    {...comment}
                    removeCommentFromList={removeCommentFromList}
                  />
                );
              })}
            </section>
          </>
        ) : null}
      </main>
    </>
  );
};
