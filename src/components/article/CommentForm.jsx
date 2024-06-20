import { useState } from 'react';
import { Message } from '../general/Message';
import { getCommentsByArticle, postComment } from '../../api';

export const CommentForm = ({ article_id, setCommentList }) => {
  const [newComment, setNewComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [isNewCommentEmpty, setIsNewCommentEmpty] = useState(false);

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

  return (
    <>
      {isPostingComment ? (
        <Message message="Posting comment..." />
      ) : (
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <label htmlFor="comment-input">
            <span className="comment-author">tickle122</span>
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
      {isNewCommentEmpty ? <Message message="Please enter a comment." /> : null}
    </>
  );
};
