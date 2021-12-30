import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearPostAlert } from '../../actions/postActions';
import { clearAuthAlert } from '../../actions/authActions';

import { ToastContainer } from 'react-toastify';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastMsg = () => {
  const postAlert = useSelector((state) => state.posts.postAlert);
  const authAlert = useSelector((state) => state.auth.authAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postAlert) {
      if (postAlert.status === 'success') {
        toast.success(postAlert.msg);
      } else {
        toast.error(postAlert.msg);
      }
      dispatch(clearPostAlert());
    }
    if (authAlert) {
      if (authAlert.status === 'success') {
        toast.success(authAlert.msg);
      } else {
        toast.error(authAlert.msg);
      }
      dispatch(clearAuthAlert());
    }
  }, [postAlert, authAlert, dispatch]);

  return (
    <ToastContainer
      position='top-right'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      transition={Slide}
    />
  );
};

export default ToastMsg;
