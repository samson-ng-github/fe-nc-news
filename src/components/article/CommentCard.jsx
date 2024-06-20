import { useState } from 'react';
import { Message } from '../message/Message';
import { deleteComment } from '../../api';

export const CommentCard = (props) => {
  const { comment_id, body, author, votes, created_at, removeCommentFromList } =
    props;
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  const handleDeleteComment = () => {
    setIsDeletingComment(true);
    deleteComment(comment_id).then((data) => {
      removeCommentFromList(comment_id);
    });
  };
  return (
    <>
      {isDeletingComment ? null : (
        <article className="comment-card">
          <p className="comment-author">{author}</p>
          <p className="comment-info">
            {`${created_at} • `}
            <span aria-label="like">👍</span>
            {` ${votes}`}
            {author === 'tickle122' ? ' • ' : null}
            {author === 'tickle122' ? (
              <button
                className="emoji"
                onClick={handleDeleteComment}
                aria-label="delete"
              >
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
