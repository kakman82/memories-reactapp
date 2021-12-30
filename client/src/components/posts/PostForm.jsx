import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, updatePost, clearCurrent } from '../../actions/postActions';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [postData, setPostData] = useState({
    name: '',
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
  });

  const [error, setError] = useState('');
  const currentPost = useSelector((state) => state.posts.current);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (currentPost) {
      setPostData(currentPost);
    }
  }, [currentPost]);

  // image/webp for unsplash.com images
  const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

  const onFileChange = (e) => {
    let selected = e.target.files[0];

    if (selected && imageTypes.includes(selected.type)) {
      setPostData({ ...postData, selectedFile: selected });
    } else {
      setPostData({ ...postData, selectedFile: '' });
      setError('Please select only .png or .jpeg files');
      setTimeout(() => setError(''), 5000);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (Object.values(postData).every((el) => el === null || el === '')) {
      return setError('No data provided! Please input something.');
    }

    let formData = new FormData();
    formData.append('name', sessionUser?.result?.name);
    formData.append('title', postData.title);
    formData.append('message', postData.message);
    // append tag array to formData via forEach loop
    postData.tags.forEach((tag) => formData.append('tags', tag));
    formData.append('selectedFile', postData.selectedFile);

    if (currentPost) {
      // update current post;
      dispatch(updatePost(currentPost._id, formData));
      setError('');
    } else {
      // create a new post;
      dispatch(addPost(formData, navigate));
      setError('');
    }
    onClear();
  };
  const onClear = () => {
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
    dispatch(clearCurrent());
  };

  if (!sessionUser) {
    return (
      <article className='message is-info'>
        <div className='message-body'>
          Please sign in to create your own memory and like other's memories...
        </div>
      </article>
    );
  }

  return (
    <div className='box'>
      <p className='mb-3 is-size-5 has-text-weight-bold has-text-centered is-italic'>
        {currentPost ? 'Editing Selected Memory...' : 'Creating a Memory...'}
      </p>
      {error && (
        <article className='message is-danger'>
          <div className='message-body'>
            <i className='fas fa-exclamation-circle'></i> {error}
          </div>
        </article>
      )}
      <div className='field'>
        <div className='control'>
          <input
            className='input is-primary'
            type='text'
            placeholder='Title'
            name='title'
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
        </div>
      </div>
      <div className='field'>
        <div className='control'>
          <textarea
            className='textarea is-primary'
            placeholder='Message'
            rows='10'
            name='message'
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }></textarea>
        </div>
      </div>
      <div className='field'>
        <div className='control'>
          <input
            className='input is-primary'
            type='text'
            placeholder='Tags - comma separated'
            name='tags'
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(',') })
            }
          />
        </div>
      </div>
      <div className='file has-name is-fullwidth is-primary'>
        <label className='file-label'>
          <input className='file-input' type='file' onChange={onFileChange} />
          <span className='file-cta'>
            <span className='file-icon'>
              <i className='fas fa-upload'></i>
            </span>
            <span className='file-label'>Choose a file…</span>
          </span>
          <span className='file-name'>
            {postData.selectedFile && postData.selectedFile.name}
          </span>
        </label>
      </div>

      <button className='button my-3 is-info is-fullwidth' onClick={onSubmit}>
        {currentPost ? 'Update' : 'Save'}
      </button>
      <button className='button is-danger is-fullwidth' onClick={onClear}>
        Clear
      </button>
    </div>
  );
};

export default PostForm;
