import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layouts/NavBar';
import ToastMsg from './components/layouts/ToastMsg';
import Home from './components/pages/Home';
import PostDetails from './components/posts/PostDetails';
import Auth from './components/pages/Auth';
import NoMatch from './components/pages/NoMatch';

const App = () => {
  const user = localStorage.getItem('profile');
  return (
    <section className='section is-fullheight'>
      <Navbar />
      <ToastMsg />
      <Routes>
        <Route path='/' element={<Navigate to='/posts' />} />
        <Route path='/posts' element={<Home />} />
        <Route path='/posts/search' element={<Home />} />
        <Route path='/posts/:id' element={<PostDetails />} />
        <Route
          path='/auth'
          element={user ? <Navigate to='/posts' /> : <Auth />}
        />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </section>
  );
};

export default App;
