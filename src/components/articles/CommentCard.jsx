import { useState } from 'react';
import { deleteComment } from '../../api';

export const CommentCard = (props) => {
  const { comment_id, body, author, votes, created_at, removeCommentFromList } =
    props;
  const [isDeletingMessage, setIsDeletingMessage] = useState(false);

  const handleDeleteComment = () => {
    setIsDeletingMessage(true);
    deleteComment(comment_id)
      .then((data) => {
        removeCommentFromList(comment_id);
        setTimeout(() => {}, 1000);
      })
      .catch((err) => {
        console.log(err);
        setIsDeletingMessage(false);
      });
  };
  return (
    <>
      {isDeletingMessage ? (
        <h2 className="loading-message">Deleting message...</h2>
      ) : null}

      {isDeletingMessage ? null : (
        <article className="comment-card">
          <p className="comment-author">{author}</p>
          <p className="comment-info">
            {`${created_at} • 👍 ${votes}`}
            {author === 'tickle122' ? ' • ' : null}
            {author === 'tickle122' ? (
              <button className="bin-comment" onClick={handleDeleteComment}>
                🗑️
              </button>
            ) : null}
          </p>
          <p>{body}</p>
        </article>
      )}
    </>
  );
};
