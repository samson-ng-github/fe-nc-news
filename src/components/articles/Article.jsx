import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleByID, getCommentsByArticle, patchVotes } from '../../api';
import { CommentCard } from './CommentCard';

export const Article = () => {
  const [article, setArticle] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [fakeKudos, setFakeKudos] = useState(0);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
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
    patchVotes(article_id, 1)
      .then((data) => {})
      .catch((err) => {
        setFakeKudos(fakeKudos - 1);
      });
  };

  const handelThumbDown = () => {
    setFakeKudos(fakeKudos - 1);
    patchVotes(article_id, -1)
      .then((data) => {})
      .catch((err) => {
        setFakeKudos(fakeKudos + 1);
      });
  };

  return (
    <main>
      <article id="article">
        {isArticleLoading ? (
          'Loading article...'
        ) : (
          <div>
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
          </div>
        )}
      </article>
      {isCommentsLoading
        ? 'Loading comments...'
        : commentList.map((comment) => {
            return <CommentCard key={comment.comment_id} {...comment} />;
          })}
    </main>
  );
};
