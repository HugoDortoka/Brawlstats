import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ onUserLogout }) {
    const navigate = useNavigate();

    return (
      <div>
        <h1>User Profile</h1>
        <p>Estas en el user profile</p>
        <button onClick={() => {
            onUserLogout(); // Llama a la función onLogout
            navigate('/');
        }}>Cerrar sesión</button>
      </div>
    );
  }

export default Profile;
