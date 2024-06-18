import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getArticleByID,
  getCommentsByArticle,
  patchVotes,
  postComment,
} from '../../api';
import { CommentCard } from './CommentCard';

export const Article = () => {
  const [article, setArticle] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [fakeKudos, setFakeKudos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { article_id } = useParams();

  useEffect(() => {
    resetCommentList();
  }, [article_id]);

  const resetCommentList = () => {
    const promiseArr = [
      getArticleByID(article_id),
      getCommentsByArticle(article_id),
    ];

    Promise.all(promiseArr).then((data) => {
      setArticle(data[0].article);
      setCommentList(data[1].comments);
      setFakeKudos(data[0].article.votes);
      setIsLoading(false);
    });
  };

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
    setIsPostingComment(true);
    postComment(article_id, newComment, 'tickle122')
      .then((data) => {
        return resetCommentList();
      })
      .then(() => {
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
      {isLoading ? (
        <h2 className="loading-message">Loading...</h2>
      ) : (
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
            <h2 className="loading-message">Posting comments...</h2>
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
                required
              ></input>
              <button id="comment-submit" type="submit">
                Send
              </button>
            </form>
          )}

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
      )}
    </main>
  );
};
