import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [data, setDate] = useState({})
  const [passwordMessage, setpasswordMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length <= 5) {
      setpasswordMessage('Password must be at least 5 characters long.');
    } else {
      const response = await axios.post('http://localhost:3002/api/auth/login', formData);
      const token = response.data;
console.log('TOKEN',token)
      if (token.status === 'success') {
        localStorage.setItem('accessToken', token.data.accessToken);
        setErrorMessage('');

        navigate('/dashboard', { state: token.data });
      } else {
        setErrorMessage(token.message)
      }
      // Redirect to dashboard

    };
  }



  return (
    <div className="register-container">
      <h2 className="register-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email" style={{ fontSize: '16px', fontWeight: '500' }}>Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" style={{ fontSize: '16px', fontWeight: '500' }}>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        {passwordMessage && <p className="success-message">{passwordMessage}</p>}
        <button type="submit" className="register-button">
          Login
        </button>
        {errorMessage && <p className="success-message">{errorMessage}</p>}
        <p>
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} className="form-switch" style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
