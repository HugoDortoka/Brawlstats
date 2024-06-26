import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tag, setTag] = useState('');
    const [playerData, setPlayerData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
  
    const handleCheckTag = async () => {
      try {
          const response = await axios.get(`http://localhost:3000/${tag}`);
          setPlayerData(response.data);
          return response.data;
      } catch (err) {
          setPlayerData(null);
          throw err;
      }
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const data = await handleCheckTag();
        if (data && data.name !== undefined) {
          const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, tag }),
          });
      
          if (response.ok) {
              window.alert('User created correctly');
              navigate('/login');
          } else {
              setErrorMessage('Error creating the user');
          }
        } else {
          setErrorMessage('Enter a valid tag');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    return (
      <div className="container">
        <div className="form3">
          <div className = "divLogin">
            <div>Register</div>
            <form onSubmit={handleSubmit}>
              <div>
                <input className="input__login" type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <input className="input__login" type="text" id="tag" name="tag" placeholder="Player Tag" value={tag} onChange={(e) => setTag(e.target.value)} required />
              </div>
              <div>
                <input className="input__login" type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button className="submit__login" type="submit">Sing Up</button>
            </form>
            <Link to="/login" className="link">Log In</Link>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        </div>
      </div>
    );
  }

export default Register;
