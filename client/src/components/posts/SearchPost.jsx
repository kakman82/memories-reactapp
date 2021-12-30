import React, { useState } from 'react';
// npm i @pathofdev/react-tag-input
// https://betterstack.dev/projects/react-tag-input/
import ReactTagInput from '@pathofdev/react-tag-input';
import '../../../node_modules/@pathofdev/react-tag-input/src/styles/index.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/postActions';

const SearchPost = () => {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchPost = () => {
    if (search.trim() || tags) {
      // tags should be added into url as text(String) with comma seperated not an array!
      dispatch(getPostsBySearch({ search: search, tags: tags.join(',') }));
      navigate(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
      );
    } else {
      navigate('/');
    }
  };
  return (
    <div className='box'>
      <div className='field'>
        <div className='control'>
          <input
            className='input is-success'
            type='text'
            placeholder='Search memories...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className='field'>
        <div className='control'>
          <ReactTagInput
            style={{ borderColor: '#48c78e' }}
            placeholder='Type and press enter to search tags'
            tags={tags}
            onChange={(newTags) => setTags(newTags)}
            validator={(value) => {
              if (tags.includes(value)) {
                alert(
                  'You have already typed this tag. Please enter different one...'
                );
                return false;
              }
              return true;
            }}
          />
        </div>
      </div>
      <button className='button is-info is-fullwidth' onClick={searchPost}>
        Search
      </button>
    </div>
  );
};

export default SearchPost;
