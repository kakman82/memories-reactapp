import * as types from '../actions/types';

const initialState = {
  posts: null,
  post: null,
  loading: true,
  current: null,
  postAlert: null,
  currentPage: null,
  numberOfPages: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POSTS:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        loading: false,
      };
    case types.GET_POSTS_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case types.GET_ONE_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case types.ADD_POST:
      return {
        ...state,
        posts: [action.payload.newPost, ...state.posts],
        loading: false,
        postAlert: action.payload.alert,
      };
    case types.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case types.CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case types.UPDATE_POST:
    case types.LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.updatedPost._id
            ? action.payload.updatedPost
            : post
        ),
        loading: false,
        postAlert: action.payload.alert,
      };
    case types.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.postId),
        postAlert: action.payload.alert,
      };
    case types.CLEAR_TOAST_MSG:
      return {
        ...state,
        postAlert: null,
      };
    default:
      return state;
  }
};

export default postReducer;
