import axios from 'axios';

const base = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const getTopics = () => {
  return base
          .get('/topics')
          .then(res => res.data.data)
};

export const getSavedPosts = () => {
  return base
          .get('/posts')
          .then(res => res.data.data)
}