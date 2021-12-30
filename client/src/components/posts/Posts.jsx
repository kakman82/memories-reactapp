import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import ProgressBar from '../layouts/ProgressBar';
import PostItem from './PostItem';

const Post = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const { posts, loading } = useSelector((state) => state.posts);

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <div className='columns is-multiline'>
      {posts?.length > 0 ? (
        posts.map((post) => (
          <div className='column is-one-third is-12-mobile' key={post._id}>
            <PostItem post={post} />
          </div>
        ))
      ) : (
        <div className='column'>
          <article className='message is-info'>
            <div className='message-body'>
              There is no post to display. Please add a new one!
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default Post;
