import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'email') {
      if (!validateEmail(e.target.value)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError('Invalid email format');
      return;
    }
    setEmailError('');

    const result = await dispatch(registerUser(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/'); // Redirect to the homepage on successful registration
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {error?.username && <p style={{ color: 'red' }}>{error.username[0]}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          {error?.email && (
            <p style={{ color: 'red' }}>
              {error.email[0].includes('already exists')
                ? 'This email is already in use. Please use a different email.'
                : error.email[0]}
            </p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={status === 'loading'}>
          Register
        </button>
      </form>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && (
        <p style={{ color: 'red' }}>
          Registration failed. {error?.non_field_errors || ''}
        </p>
      )}
    </div>
  );
};

export default Register;
