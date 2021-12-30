import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, clearCurrent } from '../../actions/postActions';

const PostDeleteModal = ({ toggleModal, setToggleModal }) => {
  const postToDelete = useSelector((state) => state.posts.current);
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deletePost(postToDelete._id));
    dispatch(clearCurrent());
    setToggleModal(false);
  };

  return (
    <div className={`modal ${toggleModal && 'is-active'}`}>
      <div className='modal-background'></div>
      <div className='modal-card' style={{ width: '400px' }}>
        <header className='modal-card-head'>
          <p className='modal-card-title has-text-centered has-text-danger-dark has-text-weight-bold'>
            Are you sure?
          </p>
          <button
            className='delete'
            aria-label='close'
            onClick={() => setToggleModal(false)}></button>
        </header>
        <section className='modal-card-body'>
          <span className='icon-text '>
            <span className='icon has-text-danger'>
              <i className='fas fa-exclamation-circle'></i>
            </span>
            <span>This action cannot be undone!</span>
          </span>
        </section>
        <footer className='modal-card-foot is-justify-content-space-between'>
          <button
            className='button is-info'
            onClick={() => setToggleModal(false)}>
            Close
          </button>
          <button className='button is-danger' onClick={onDelete}>
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
};

PostDeleteModal.propTypes = {
  toggleModal: PropTypes.bool.isRequired,
  setToggleModal: PropTypes.func.isRequired,
};

export default PostDeleteModal;
