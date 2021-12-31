import * as types from './types';
import * as api from '../api/index';

//* Get all posts;
export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page);

    dispatch({
      type: types.GET_POSTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: types.AUTH_ALERT,
        payload: error.response.data,
      });
    }
  }
};

//* Get single post;
export const getOnePost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.fetchOnePost(postId);
    dispatch({
      type: types.GET_ONE_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: types.AUTH_ALERT,
        payload: error.response.data,
      });
    }
  }
};

//* Get posts by search Query;
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);

    dispatch({
      type: types.GET_POSTS_BY_SEARCH,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: types.AUTH_ALERT,
        payload: error.response.data,
      });
    }
  }
};

//* Create a post;
export const addPost = (newPost, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(newPost);

    navigate(`/posts/${data.newPost._id}`);

    dispatch({
      type: types.ADD_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: types.AUTH_ALERT,
        payload: error.response.data,
      });
    }
  }
};

//* Set Current;
export const setCurrent = (post) => {
  return {
    type: types.SET_CURRENT,
    payload: post,
  };
};

//* Clear Current;
export const clearCurrent = () => {
  return {
    type: types.CLEAR_CURRENT,
  };
};

//* Update a post;
export const updatePost = (id, postToUpdate) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, postToUpdate);

    dispatch({
      type: types.UPDATE_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: types.AUTH_ALERT,
        payload: error.response.data,
      });
    }
  }
};

//* Delete a post
export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(id);
    dispatch({
      type: types.DELETE_POST,
      payload: data,
      postId: id,
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: types.AUTH_ALERT,
        payload: error.response.data,
      });
    }
  }
};

//* Clear Server Message;
export const clearPostAlert = () => {
  return (dispatch) => {
    dispatch({
      type: types.CLEAR_TOAST_MSG,
    });
  };
};

//* Like post;
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({
      type: types.LIKE_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: types.AUTH_ALERT,
        payload: error.response.data,
      });
    }
  }
};
