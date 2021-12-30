import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../actions/types';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
  const toggleNavbar = () => {
    document.querySelector('.navbar-menu').classList.toggle('is-active');
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    setUser(null);
    toggleNavbar();
    navigate('/');
    window.location.reload();
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;
    //JWT decode
    if (token) {
      const decodedToken = decode(token);

      // check if it is expired or not
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
    // location means if there is a change on routes/pages
  }, [location, logout, user?.token]);

  return (
    <nav
      className='navbar is-info px-2 mb-6'
      role='navigation'
      aria-label='main navigation'>
      <div className='navbar-brand '>
        <Link className='navbar-item' to='/'>
          <img src='/pictures.png' width='30' height='25' alt='' />

          <p className='is-size-2 ml-2 has-text-weight-bold is-italic'>
            Memories...
          </p>
        </Link>

        <a
          href='#!'
          role='button'
          className='navbar-burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
          onClick={toggleNavbar}>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-end'>
          {user?.result ? (
            <div className='navbar-item'>
              {user?.result.imageUrl ? (
                <figure className='image is-32x32'>
                  <img
                    className='is-rounded'
                    src={user?.result.imageUrl}
                    alt='...'
                  />
                </figure>
              ) : (
                <i className='far fa-user-circle fa-2x'></i>
              )}

              <p className='ml-2 has-text-weight-bold is-italic'>
                {user?.result.name}
              </p>
              <button className='button is-danger ml-6 mr-2' onClick={logout}>
                <i className='fas fa-sign-out-alt'></i>
                <strong className='ml-2'>LOG OUT</strong>
              </button>
            </div>
          ) : (
            <div className='navbar-item'>
              <Link
                to='/auth'
                className='button is-primary ml-6 mr-2'
                onClick={toggleNavbar}>
                <i className='fas fa-sign-in-alt'></i>
                <strong className='ml-2'>SIGN IN</strong>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
