import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/main.css';

function Layout({ userLogged }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toggleBtn = document.querySelector('.toggle_btn');
    const dropDownMenu = document.querySelector('.dropdown_menu');

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    toggleBtn.addEventListener('click', toggleMenu);

    // Limpia el evento al desmontar el componente
    return () => toggleBtn.removeEventListener('click', toggleMenu);
  }, [isOpen]);

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
          {userLogged === 'true' ? (
            <Link to="/profile" className="action_btn">Profile</Link>
          ) : (
            <Link to="/login" className="action_btn">Log In</Link>
          )}
          <div className="toggle_btn">
            {isOpen ? (
              <img className="menu" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 24 24'%3e%3cline x1='1' y1='1' x2='23' y2='23' stroke='%23000' stroke-width='2'/%3e%3cline x1='23' y1='1' x2='1' y2='23' stroke='%23000' stroke-width='2'/%3e%3c/svg%3e"></img>
            ) : (
              <img className="menu" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='%23000' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"></img>
            )}
          </div>
        </div>
        <div className={`dropdown_menu ${isOpen ? 'open' : ''}`}>
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
