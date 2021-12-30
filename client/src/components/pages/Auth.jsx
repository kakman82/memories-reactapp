import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../actions/types';
import { signup, signin } from '../../actions/authActions';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const Auth = () => {
  const [user, setUser] = useState(initialState);

  const { firstName, lastName, email, password, passwordConfirm } = user;

  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const googleSuccess = async (res) => {
    // ? = Optional chaining - prevent wired error if res does not exist
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, payload: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log('Google sign-in was unsuccessful. Try again later');
  };

  const switchForm = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(user, navigate));
    } else {
      dispatch(signin(user, navigate));
    }
  };

  return (
    <div className='columns is-centered'>
      <div className='column is-half '>
        <div className='box'>
          <div className='has-text-centered'>
            <i className='fas fa-lock fa-2x has-text-danger'></i>

            <p className='mb-5 is-size-3 has-text-centered has-text-info-dark'>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </p>
          </div>
          <form onSubmit={onSubmit}>
            {isSignup && (
              <div className='field is-horizontal'>
                <div className='field-body'>
                  <div className='field'>
                    <p className='control has-icons-left'>
                      <input
                        className='input'
                        placeholder='First Name'
                        type='text'
                        name='firstName'
                        value={firstName}
                        onChange={onChange}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fas fa-user'></i>
                      </span>
                    </p>
                  </div>
                  <div className='field'>
                    <p className='control has-icons-left'>
                      <input
                        className='input'
                        placeholder='Last Name'
                        type='text'
                        name='lastName'
                        value={lastName}
                        onChange={onChange}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fas fa-user'></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className='field'>
              <p className='control has-icons-left'>
                <input
                  className='input'
                  placeholder='Email'
                  type='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-envelope'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <p className='control has-icons-left'>
                <input
                  className='input'
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  minLength='6'
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-lock'></i>
                </span>
              </p>
            </div>
            {isSignup && (
              <div className='field'>
                <p className='control has-icons-left'>
                  <input
                    className='input'
                    placeholder='Password Confirm'
                    type='password'
                    name='passwordConfirm'
                    value={passwordConfirm}
                    onChange={onChange}
                    minLength='6'
                  />
                  <span className='icon is-small is-left'>
                    <i className='fas fa-lock'></i>
                  </span>
                </p>
              </div>
            )}
            <div className='field'>
              <p className='control'>
                <button className='button is-info is-fullwidth'>
                  {isSignup ? 'SIGN UP' : 'SIGN IN'}
                </button>
              </p>
            </div>
            {!isSignup && (
              <div className='field'>
                <GoogleLogin
                  clientId={clientId}
                  render={(renderProps) => (
                    <GoogleButton
                      type='light'
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    />
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            )}
          </form>

          <div className='my-2 is-flex  is-justify-content-center'>
            <p className='is-flex is-align-self-center has-text-weight-bold'>
              {isSignup
                ? 'Already have an account?'
                : 'Do not have an account?'}
            </p>
            <button
              className='button has-text-info has-text-weight-bold'
              style={{
                backgroundColor: 'white',
                borderColor: 'white',
                outline: 'none',
                boxShadow: 'none',
              }}
              onClick={switchForm}>
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
