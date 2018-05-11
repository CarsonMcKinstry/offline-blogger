import axios from 'axios';
const logI = i => {
  console.log(i);
  return i;
};

const base = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const getTopics = () => {
  return base
    .get('/topics')
    .then(res => res.data.data)
    // .then(logI);
};

export const getSavedPosts = () => {
  return base.get('/posts').then(res => res.data.data);
};
