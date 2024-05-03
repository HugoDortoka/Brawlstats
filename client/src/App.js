// App.js

import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
       <h1>Routes</h1>
       <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='about' element={<About />} />
            <Route path='/' element={<Home />} />
            <Route path='contact' element={<Contact />} />
          </Route>
       </Routes>
    </div>
  );
}

export default App;
