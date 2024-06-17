import axios from 'axios';
const ncNewsApi = axios.create({
  baseURL: 'https://be-nc-news-v1e2.onrender.com/api',
});
const getArticles = () => {
  return ncNewsApi.get('/articles').then((res) => {
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

export { getArticles, getArticleByID, getCommentsByArticle, patchVotes };
