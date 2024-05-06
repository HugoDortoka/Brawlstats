import { Outlet } from "react-router-dom"

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/main.css';

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className="header">
        <div className="left">
          <h1>Brawl Stats</h1>
        </div>
        <div className="middle">
          {/* Enlaces del menú */}
          <Link to="/" className="link">Search</Link>
          <Link to="/wiki" className="link">Wiki</Link>
          <Link to="/top" className="link">Top</Link>
        </div>
        <div className={`right ${menuOpen ? 'open' : ''}`}>
          {/* Botón de menú para dispositivos móviles */}
          <button className="menu-button" onClick={toggleMenu}>
            Menu
          </button>
          {/* Enlaces de registro y inicio de sesión */}
          <div>
            <Link to="/register" className="link">Register</Link>
            <span className="link"> | </span>
            <Link to="/login" className="link">Login</Link>
          </div>
        </div>
      </header>
      {/* Outlet para mostrar el contenido */}
      <Outlet />
    </div>
  );
}

export default Layout;
