import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ onAdminLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/adminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        localStorage.setItem('adminLoggedIn', 'true');
        onAdminLogin(); // Llama a la función onLogin
        navigate('/adminHome');
      } else {
        window.alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className='container'>
      <div className="form3">
        <div className = "divLogin">
          <div>Admin Log In</div>
          <form  onSubmit={handleSubmit}>
            <div>
              <input className="input__login" type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <input className="input__login" type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="submit__login" type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
