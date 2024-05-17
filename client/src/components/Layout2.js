import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../CSS/main.css';

function Layout2({ onAdminLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

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
            <li><Link to="/adminHome" className="link">Statistics</Link></li>
            <li><Link to="/adminSponsor" className="link">Sponsors</Link></li>
          </ul>
          
          <Link to="/adminSponsor" className="action_btn" onClick={() => {
                onAdminLogout(); // Llama a la función onLogout
                navigate('/adminLogin');
            }}>Log Out
          </Link>

          <div className="toggle_btn">
            {isOpen ? (
              <img className="menu" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 24 24'%3e%3cline x1='1' y1='1' x2='23' y2='23' stroke='%23000' stroke-width='2'/%3e%3cline x1='23' y1='1' x2='1' y2='23' stroke='%23000' stroke-width='2'/%3e%3c/svg%3e"></img>
            ) : (
              <img className="menu" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='%23000' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"></img>
            )}
          </div>
        </div>
        <div className={`dropdown_menu ${isOpen ? 'open' : ''}`}>
          <li><Link to="/adminHome" className="link">Statistics</Link></li>
          <li><Link to="/adminSponsor" className="link">Sponsors</Link></li>
     
          <li>
            <Link to="/adminSponsor" className="action_btn" onClick={() => {
                onAdminLogout(); // Llama a la función onLogout
                navigate('/adminLogin');
            }}>Log Out
            </Link>
          </li>
        </div>
      </header>

      <Outlet />
    </div>
  );
}

export default Layout2;
