import React from 'react';
import Posts from '../posts/Posts';
import SearchPost from '../posts/SearchPost';
import PostForm from '../posts/PostForm';
import Pagination from '../layouts/Pagination';
import { useLocation } from 'react-router-dom';

const Home = () => {
  // to get query strings from the url - core JS;
  const query = new URLSearchParams(useLocation().search);

  // get page info from url - this info also a prop for Pagination component if not a page info it is default 1
  const page = query.get('page') || 1;

  // react-router-dom / useSearchParams can also used for get page number from the url;
  // const [params] = useSearchParams();
  // const page = params.get('page');

  return (
    <div className='columns is-justify-content-space-between is-align-content-stretch'>
      <div className='column is-8'>
        <Posts />
      </div>
      <div className='column is-4'>
        <SearchPost />
        <PostForm />
        <Pagination page={Number(page)} />
      </div>
    </div>
  );
};

export default Home;
