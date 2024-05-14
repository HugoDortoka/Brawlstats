import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login({ onUserLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:3000/userLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const userData = await response.json();
          localStorage.setItem('userLoggedIn', userData.tag);
          onUserLogin(); // Llama a la función onLogin
          navigate('/');
        } else {
          window.alert('Credenciales incorrectas');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    };
  
    return (
      <div className="container">
        <div className="form">
          <div className = "divLogin">
            <div>Log In</div>
            <form  onSubmit={handleSubmit}>
              <div>
                <input className="input__login" type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <input className="input__login" type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button className="submit__login" type="submit">Log In</button>
            </form>
            <Link to="/register" className="link">Register</Link>
          </div>
        </div>
      </div>
    );
  }

export default Login;
