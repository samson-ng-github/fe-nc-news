import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Message } from '../message/Message';
import { CommentCard } from './CommentCard';
import {
  getArticleByID,
  getCommentsByArticle,
  patchVotes,
  postComment,
} from '../../api';

export const Article = () => {
  const [article, setArticle] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [fakeKudos, setFakeKudos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [isNewCommentEmpty, setIsNewCommentEmpty] = useState(false);
  const [newComment, setNewComment] = useState('');
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

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment) {
      setIsNewCommentEmpty(true);
      setTimeout(() => {
        setIsNewCommentEmpty(false);
      }, 1000);
      return null;
    }
    setIsPostingComment(true);
    postComment(article_id, newComment, 'tickle122')
      .then((data) => {
        return getCommentsByArticle(article_id);
      })
      .then((data) => {
        setCommentList(data.comments);
        setIsPostingComment(false);
        setNewComment('');
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
            <img id="article-img" src={article.article_img_url} />
            <h2>{article.title}</h2>
            <h3>{article.author}</h3>
            <p className="article-info">
              {`${article.topic.toUpperCase()} • ${article.created_at} • `}
              <button className="emoji" onClick={handleThumbUp}>
                👍
              </button>{' '}
              <button className="emoji" onClick={handleThumbDown}>
                👎
              </button>{' '}
              {`${fakeKudos}`}
            </p>
            <p>{article.body}</p>
          </article>

          {isPostingComment ? (
            <Message message="Posting comment..." />
          ) : (
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <label>
                <span id="new-comment-author" htmlFor="comment-input">
                  tickle122
                </span>
              </label>
              <input
                type="text"
                name="comment"
                id="comment-input"
                placeholder="Post a comment"
                onChange={handleCommentChange}
                value={newComment}
              ></input>
              <button id="comment-submit" type="submit">
                Send
              </button>
            </form>
          )}
          {isNewCommentEmpty ? (
            <Message message="Please enter a comment." />
          ) : null}

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
