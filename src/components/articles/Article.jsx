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
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const { article_id } = useParams();

  useEffect(() => {
    const promiseArr = [
      getArticleByID(article_id),
      getCommentsByArticle(article_id),
    ];

    Promise.all(promiseArr).then((data) => {
      setArticle(data[0].article);
      setCommentList(data[1].comments);
      setFakeKudos(data[0].article.votes);
      setIsArticleLoading(false);
      setIsCommentsLoading(false);
    });
  }, [article_id]);

  const handelThumbUp = () => {
    setFakeKudos(fakeKudos + 1);
    patchVotes(article_id, 1).catch((err) => {
      setFakeKudos(fakeKudos - 1);
    });
  };

  const handelThumbDown = () => {
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
    postComment(article_id, newComment, 'tickle122').then((data) => {
      const fakeComment = {
        comment_id: 'pending',
        body: newComment,
        article_id,
        author: 'tickle122',
        created_at: 'Just now',
        votes: 0,
      };
      setCommentList([fakeComment, ...commentList]);
      setNewComment('');
    });
  };

  return (
    <main>
      {isArticleLoading ? <h2>Loading article...</h2> : null}
      {isArticleLoading ? null : (
        <article id="article">
          <img id="article-img" src={article.article_img_url} />
          <h2>{article.title}</h2>
          <h3>{article.author}</h3>
          <p className="article-info">
            {`${article.topic.toUpperCase()} • ${article.created_at} • `}
            <button className="kudos" onClick={handelThumbUp}>
              👍
            </button>{' '}
            <button className="kudos" onClick={handelThumbDown}>
              👎
            </button>{' '}
            {`${fakeKudos}`}
          </p>
          <p>{article.body}</p>
        </article>
      )}

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

      {isCommentsLoading ? <h2>Loading comments...</h2> : null}
      {isCommentsLoading
        ? null
        : commentList.map((comment) => {
            return <CommentCard key={comment.comment_id} {...comment} />;
          })}
    </main>
  );
};
