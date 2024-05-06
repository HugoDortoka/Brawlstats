import { Outlet } from "react-router-dom"

// Layout.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/main.css';

function Layout() {
  return (
    <div>
      <header className="header">
        <div className="left">
          <h1>Brawl Stats</h1>
        </div>
        <div className="middle">
          <Link to="/" className="link">Search</Link>
          <Link to="/wiki" className="link">Wiki</Link>
          <Link to="/top" className="link">Top</Link>
        </div>
        <div className="right">
          <Link to="/register" className="link">Register</Link>
          <span>|</span>
          <Link to="/login" className="link">Login</Link>
        </div>
      </header>
      <Outlet />
    </div>
    
  );
}

export default Layout;
