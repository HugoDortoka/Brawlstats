import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Search from './components/Search';
import Wiki from './components/Wiki';
import Top from './components/Top';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminHome from './components/admin/AdminHome';
import NotFound from './components/NotFound';

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    localStorage.getItem('adminLoggedIn') === 'true'
  );

  const handleAdminLogin = () => {
    setAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    localStorage.clear();
    setAdminLoggedIn(false);
  };

  const [userLoggedIn, setUserLoggedIn] = useState(
    localStorage.getItem('userLoggedIn') !== null && localStorage.getItem('userLoggedIn') !== ''
  );

  const handleUserLogin = () => {
    setUserLoggedIn(true);
  };

  const handleUserLogout = () => {
    localStorage.clear();
    setUserLoggedIn(false);
  };

  return (
    <div>
       <Routes>
          <Route path='/' element={userLoggedIn ? <Layout userLogged='true'/> : <Layout userLogged='false'/>}>
            <Route path='/' element={<Search />} />
            <Route path='wiki' element={<Wiki />} />
            <Route path='top' element={<Top />} />
            <Route path='login' element={<Login onUserLogin={handleUserLogin} />} />
            <Route path='profile' element={userLoggedIn ? <Profile onUserLogout={handleUserLogout} /> : <Navigate to="/" />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='adminLogin' element={<AdminLogin onAdminLogin={handleAdminLogin} />} />
          <Route path='adminHome' element={adminLoggedIn ? <AdminHome onAdminLogout={handleAdminLogout} /> : <Navigate to="/adminLogin" />} />
          <Route path='*' element={<NotFound />} />
       </Routes>
       <Footer />
    </div>
  );
}

export default App;
