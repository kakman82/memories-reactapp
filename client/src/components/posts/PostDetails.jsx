import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePost } from '../../actions/postActions.js';
import ProgressBar from '../layouts/ProgressBar';
import moment from 'moment';

const PostDetails = () => {
  const { post, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOnePost(id));
  }, [dispatch, id]);

  if (!post) return null;

  if (loading) {
    return <ProgressBar />;
  }

  const { selectedFile, title, tags, message, name, createdAt } = post;

  return (
    <div className='card'>
      <div className='card-content'>
        <div className='card-image'>
          <figure className='image is-fullwidth'>
            <img
              src={
                post
                  ? `/uploads/${selectedFile}`
                  : 'https://bulma.io/images/placeholders/1280x960.png'
              }
              alt='post_image'
            />
          </figure>
        </div>

        <div className='content'>
          <p className='title my-3'>{title}</p>
          <p className='subtitle is-size-7 my-2'>
            {tags && tags.map((tag) => `#${tag} `)}
          </p>
          {message}
          <br />
          <p className='is-size-6 mt-3 mb-0 has-text-weight-bold'>
            Created by: {name}
          </p>
          <p className='is-size-6'>{moment(createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
