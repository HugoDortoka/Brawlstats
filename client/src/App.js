import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Layout2 from './components/Layout2';
import Search from './components/Search';
import Wiki from './components/Club';
import Top from './components/Top';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminHome from './components/admin/AdminHome';
import AdminSponsor from './components/admin/AdminSponsor';
import AdminNewSponsor from './components/admin/AdminNewSponsor';
import NotFound from './components/NotFound';

// src/index.js o src/App.js
import './assets/fonts/fonts.css';
import Club from './components/Club';

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
            <Route path='club' element={<Club />} />
            <Route path='top' element={<Top />} />
            <Route path='login' element={<Login onUserLogin={handleUserLogin} />} />
            <Route path='profile' element={userLoggedIn ? <Profile onUserLogout={handleUserLogout} /> : <Navigate to="/" />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='adminLogin' element={<AdminLogin onAdminLogin={handleAdminLogin} />} />
          <Route path='/' element={<Layout2  onAdminLogout={handleAdminLogout} />}>
            <Route path='adminHome' element={adminLoggedIn ? <AdminHome /> : <Navigate to="/adminLogin" />} />
            <Route path='adminSponsor' element={adminLoggedIn ? <AdminSponsor /> : <Navigate to="/adminLogin" />} />
            <Route path='adminNewSponsor' element={adminLoggedIn ? <AdminNewSponsor /> : <Navigate to="/adminLogin" />} />
          </Route>
          <Route path='*' element={<NotFound />} />
       </Routes>
       <Footer />
    </div>
  );
}

export default App;
