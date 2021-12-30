import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
});

export default rootReducer;
