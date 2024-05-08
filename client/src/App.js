import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Search from './components/Search';
import Wiki from './components/Wiki';
import Top from './components/Top';
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

  return (
    <div>
       <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Search />} />
            <Route path='wiki' element={<Wiki />} />
            <Route path='top' element={<Top />} />
          </Route>
          <Route path='adminLogin' element={<AdminLogin onAdminLogin={handleAdminLogin} />} />
          <Route path='adminHome' element={adminLoggedIn ? <AdminHome onAdminLogout={handleAdminLogout} /> : <Navigate to="/adminLogin" />} />
          <Route path='*' element={<NotFound />} />
       </Routes>
    </div>
  );
}

export default App;
