import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleByID, getCommentsByArticle } from '../../api';
import { CommentCard } from './CommentCard';

export const Article = () => {
  const [article, setArticle] = useState({});
  const [commentList, setCommentList] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    const promiseArr = [
      getArticleByID(article_id),
      getCommentsByArticle(article_id),
    ];

    Promise.all(promiseArr).then((data) => {
      setArticle(data[0].article);
      setCommentList(data[1].comments);
    });
  }, []);

  return (
    <main>
      <article id="article">
        {Object.keys(article).length ? (
          <div>
            <img id="article-img" src={article.article_img_url} />
            <h2>{article.title}</h2>
            <h3>{article.author}</h3>
            <p className="article-info">{`${article.topic.toUpperCase()} • ${
              article.created_at
            } • 👍 ${article.votes}`}</p>
            <p>{article.body}</p>
          </div>
        ) : (
          'Loading article...'
        )}
      </article>
      {commentList.length
        ? commentList.map((comment) => {
            return <CommentCard key={comment.comment_id} {...comment} />;
          })
        : 'Loading comments...'}
    </main>
  );
};
