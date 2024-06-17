import axios from 'axios';
const ncNewsApi = axios.create({
  baseURL: 'https://be-nc-news-v1e2.onrender.com/api',
});
const getArticles = () => {
  return ncNewsApi.get('/articles').then((res) => {
    return res.data;
  });
};
// export const getUsers = () => {
//   return gamersApi.get('/users').then((res) => {
//     return res.data;
//   });
// };
// export const getGenres = () => {
//   return gamersApi.get('/genres').then((res) => {
//     return res.data;
//   });
// };

export { getArticles };
