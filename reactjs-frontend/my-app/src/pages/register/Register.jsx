import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordMessage, setpasswordMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 5){
      setpasswordMessage('Password must be at least 5 characters long.');
    }else{
       const response= await axios.post('http://localhost:3002/api/auth/register', formData);
       const token = response.data;
       if(token.status==='success'){
        setSuccessMessage(token.message);
        setErrorMessage('');
        setTimeout(() => navigate('/login'), 2000);
       }else{
        setErrorMessage(token.message);
       }
       
      
    }
   
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Sign Up</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
           {passwordMessage && <p className="success-message">{passwordMessage}</p>}
          <button type="submit" className="register-button">
            Sign Up
          </button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <p>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="form-switch" style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
