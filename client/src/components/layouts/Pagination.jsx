import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../../actions/postActions';
import PropTypes from 'prop-types';

const Pagination = ({ page }) => {
  const { currentPage, numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // Make an array for looping pagination page li lists;
  let numberOfPagesArray = [];
  for (let i = 0; i < numberOfPages; i++) {
    numberOfPagesArray[i] = i + 1;
  }

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [dispatch, page]);

  return (
    <div className='box'>
      <nav className='pagination is-centered is-rounded is-small'>
        <Link
          to={currentPage > 1 && `/posts?page=${currentPage - 1}`}
          className='pagination-previous'
          disabled={currentPage <= 1}>
          <i className='fas fa-chevron-left'></i>
        </Link>
        <Link
          to={
            currentPage < numberOfPages
              ? `/posts?page=${currentPage + 1}`
              : `/posts?page=${numberOfPages}`
          }
          className='pagination-next'
          disabled={currentPage >= numberOfPages}>
          <i className='fas fa-chevron-right'></i>
        </Link>
        <ul className='pagination-list'>
          {numberOfPagesArray.map((pageVal, index) => {
            return (
              <li key={index}>
                <Link
                  className={`${
                    currentPage === pageVal
                      ? 'pagination-link is-current'
                      : 'pagination-link'
                  }`}
                  to={`/posts?page=${pageVal}`}>
                  {pageVal}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

Pagination.prototypes = {
  page: PropTypes.number.isRequired,
};

export default Pagination;
