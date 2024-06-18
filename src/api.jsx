import axios from 'axios';
const ncNewsApi = axios.create({
  baseURL: 'https://be-nc-news-v1e2.onrender.com/api',
});
const getArticles = ({ topic, sortBy, order }) => {
  return ncNewsApi
    .get('/articles', { params: { topic, sort_by: sortBy, order } })
    .then((res) => {
      return res.data;
    });
};

const getArticleByID = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data;
  });
};

const getCommentsByArticle = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data;
  });
};

const patchVotes = (article_id, amount) => {
  return ncNewsApi
    .patch(`/articles/${article_id}`, { inc_votes: amount })
    .then((res) => {
      return res.data;
    });
};

const postComment = (article_id, body, author) => {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, { body, author })
    .then((res) => {
      return res.data;
    });
};

const deleteComment = (comment_id) => {
  return ncNewsApi.delete(`/comments/${comment_id}`).then((res) => {
    return res.data;
  });
};

const getTopics = () => {
  return ncNewsApi.get(`/topics`).then((res) => {
    return res.data;
  });
};

export {
  getArticles,
  getArticleByID,
  getCommentsByArticle,
  patchVotes,
  postComment,
  deleteComment,
  getTopics,
};
