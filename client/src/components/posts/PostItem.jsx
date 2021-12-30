import React, { Fragment, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setCurrent, likePost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import PostDeleteModal from './PostDeleteModal';
// npm i react-lines-ellipsis
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  const {
    _id,
    name,
    creator,
    createdAt,
    title,
    message,
    tags,
    selectedFile,
    likes,
  } = post;

  const dispatch = useDispatch();

  const [toggleModal, setToggleModal] = useState(false);

  const sessionUser = JSON.parse(localStorage.getItem('profile'));

  const handleEditClick = () => {
    dispatch(setCurrent(post));
  };
  const handleDeleteClick = () => {
    setToggleModal(true);
    dispatch(setCurrent(post));
  };
  const handleLikeClick = () => {
    dispatch(likePost(_id));
  };

  if (toggleModal)
    return (
      <PostDeleteModal
        toggleModal={toggleModal}
        setToggleModal={setToggleModal}
      />
    );

  const LikeComponent = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) =>
          like === sessionUser?.result?.googleId || sessionUser?.result?._id
      ) ? (
        <Fragment>
          <span className='icon'>
            <i className='fas fa-thumbs-up'></i>
          </span>
          {likes.length > 2 ? (
            <span className='is-size-7'>{`You and ${
              likes.length - 1
            } others`}</span>
          ) : (
            <span>{`${likes.length} like${likes.length > 1 ? 's' : ''}`}</span>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <span className='icon'>
            <i className='far fa-thumbs-up'></i>
          </span>
          <span>
            {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
          </span>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <span className='icon'>
            <i className='far fa-thumbs-up'></i>
          </span>
          <span> Like</span>
        </Fragment>
      );
    }
  };

  return (
    <div
      className='card is-flex is-flex-direction-column'
      style={{ height: '100%' }}>
      <div className='card-image'>
        <figure className='image is-4by3'>
          <img
            src={
              selectedFile
                ? `/uploads/${selectedFile}`
                : 'https://bulma.io/images/placeholders/1280x960.png'
            }
            alt='post_image'
          />
        </figure>
        <div className='card-content is-overlay is-flex is-justify-content-space-between'>
          <div>
            <p className='title has-text-white'>{name}</p>
            <p className='subtitle has-text-white'>
              {moment(createdAt).fromNow()}
            </p>
          </div>
          {(creator === sessionUser?.result?.googleId ||
            creator === sessionUser?.result?._id) && (
            <button className='button is-ghost' onClick={handleEditClick}>
              <span className='icon has-text-white'>
                <i className='far fa-edit fa-2x'></i>
              </span>
            </button>
          )}
        </div>
      </div>
      <div className='card-content'>
        <p className='subtitle is-6'>{tags && tags.map((tag) => `#${tag} `)}</p>
        <p className='title is-4'>{title ? title : 'No title...'}</p>
        <div className='content'>
          <LinesEllipsis
            text={message}
            maxLine='3'
            ellipsis='...'
            basedOn='words'
            trimRight
          />
          <Link
            className='button is-ghost is-marginless is-paddingless is-flex is-justify-content-flex-start'
            to={`/posts/${_id}`}>
            See more
          </Link>
        </div>
      </div>

      <footer className='card-footer mt-auto'>
        <a
          href='#!'
          className='button has-text-info-dark has-text-weight-bold card-footer-item'
          disabled={!sessionUser?.result}
          onClick={handleLikeClick}>
          <LikeComponent />
        </a>
        {(creator === sessionUser?.result?.googleId ||
          creator === sessionUser?.result?._id) && (
          <a
            href='#!'
            className='button card-footer-item has-text-danger-dark has-text-weight-bold'
            onClick={handleDeleteClick}>
            <span className='icon'>
              <i className='far fa-trash-alt'></i>
            </span>
            <span>Delete</span>
          </a>
        )}
      </footer>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;
