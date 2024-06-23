import { useState } from 'react';
import { patchComment, deleteComment } from '../../api';

export const CommentCard = (props) => {
  const { comment_id, body, author, votes, created_at, removeCommentFromList } =
    props;
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  const [fakeKudos, setFakeKudos] = useState(votes);

  const handleThumbUp = () => {
    setFakeKudos(fakeKudos + 1);
    patchComment(comment_id)
      .then((data) => {
        console.log('success');
      })
      .catch((err) => {
        setFakeKudos(fakeKudos - 1);
      });
  };

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
            <button onClick={handleThumbUp}>
              <span className="material-symbols-outlined" aria-label="like">
                thumb_up
              </span>
            </button>
            {` ${fakeKudos}`}
            {author === 'tickle122' ? ' • ' : null}
            {author === 'tickle122' ? (
              <button onClick={handleDeleteComment}>
                <span className="material-symbols-outlined" aria-label="like">
                  delete
                </span>
              </button>
            ) : null}
          </p>
          <p>{body}</p>
        </article>
      )}
    </>
  );
};
