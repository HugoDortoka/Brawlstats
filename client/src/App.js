// App.js

import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Search from './components/Search';
import Wiki from './components/Wiki';
import Top from './components/Top';
import AdminLogin from './components/admin/AdminLogin';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
       <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Search />} />
            <Route path='wiki' element={<Wiki />} />
            <Route path='top' element={<Top />} />
          </Route>
          <Route path='adminLogin' element={<AdminLogin />} />
       </Routes>
    </div>
  );
}

export default App;
