import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add a request interceptor
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

// Post api;
export const fetchOnePost = (postId) => API.get(`/posts/${postId}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, postToUpdate) =>
  API.patch(`/posts/${id}`, postToUpdate);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`posts/likePost/${id}`);

// User api;
export const signup = (newUser) => API.post('/users/signup', newUser);
export const signin = (user) => API.post('/users/signin', user);
