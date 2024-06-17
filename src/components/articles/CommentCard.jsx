export const CommentCard = (props) => {
  const { author, created_at, votes, body } = props;
  return (
    <article className="comment-card">
      <p className="comment-author">{author}</p>
      <p className="comment-info">{`${created_at} • 👍 ${votes}`}</p>
      <p>{body}</p>
    </article>
  );
};
