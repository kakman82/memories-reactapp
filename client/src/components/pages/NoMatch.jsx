import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div>
      <article className='message is-info'>
        <div className='message-body'>
          <p className='is-size-3 has-text-weight-bold'>
            Page not found that you are looking for!
          </p>

          <Link to='/' className='button is-info mt-3'>
            Go to Home Page
          </Link>
        </div>
      </article>
    </div>
  );
};

export default NoMatch;
