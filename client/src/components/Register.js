import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tag, setTag] = useState('');
    const [playerData, setPlayerData] = useState(null);
    const [error, setError] = useState('');

    const navigate = useNavigate();
  
    const handleCheckTag = async () => {
      try {
          const response = await axios.get(`http://localhost:3000/${tag}`);
          setPlayerData(response.data);
          setError('');
          return response.data;
      } catch (err) {
          setError(err.response.data.message || 'Player Not Found');
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
              window.alert('Error creating the user');
          }
        } else {
          window.alert('Enter a valid tag');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    return (
      <div>
        <h1>User Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <input type="text" id="tag" name="tag" placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} required />
          </div>
          <div>
            <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Register</button>
        </form>
        <Link to="/login" className="link">Log In</Link>
      </div>
    );
  }

export default Register;
