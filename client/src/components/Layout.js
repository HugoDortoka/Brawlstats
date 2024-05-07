import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/main.css';

function Layout() {
  useEffect(() => {
    const toggleBtn = document.querySelector('.toggle_btn');
    const dropDownMenu = document.querySelector('.dropdown_menu');

    const toggleMenu = () => {
      dropDownMenu.classList.toggle('open');
      const isOpen = dropDownMenu.classList.contains('open');
      toggleBtn.textContent = isOpen ? 'CERRAR' : 'MENU';
    };

    toggleBtn.addEventListener('click', toggleMenu);

    // Limpia el evento al desmontar el componente
    return () => toggleBtn.removeEventListener('click', toggleMenu);
  }, []); // Asegura que se ejecute solo una vez después del montaje inicial

  return (
    <div>
      <header>
        <div className="navbar">
          <div className="logo"><Link to="/" className="logo">Brawl Stats</Link></div>
        
          <ul className="links">
            <li><Link to="/" className="link">Search</Link></li>
            <li><Link to="/wiki" className="link">Wiki</Link></li>
            <li><Link to="/top" className="link">Top</Link></li>
          </ul>
          <Link to="/login" className="action_btn">Log In</Link>
          <div className="toggle_btn">
            MENU
          </div>
        </div>
        <div className="dropdown_menu">
          <li><Link to="/" className="link">Search</Link></li>
          <li><Link to="/wiki" className="link">Wiki</Link></li>
          <li><Link to="/top" className="link">Top</Link></li>
          <li><Link to="/login" className="action_btn">Log In</Link></li>
        </div>
      </header>

      <Outlet />
    </div>
  );
}

export default Layout;
