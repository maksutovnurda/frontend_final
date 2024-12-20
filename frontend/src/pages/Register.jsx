import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'email') {
      setEmailError(validateEmail(e.target.value) ? '' : 'Invalid email format');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || !validateEmail(formData.email)) {
      setEmailError('Invalid email format');
      return;
    }

    const result = await dispatch(registerUser(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      const loginResult = await dispatch(
        loginUser({ username: formData.username, password: formData.password })
      );
      if (loginResult.meta.requestStatus === 'fulfilled') {
        navigate('/'); // Redirect to homepage
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
      <div>
      <input
        type="text"
        name="username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      {error?.username && (
        <div className="error-container">
          {error.username[0].includes('already exists')
            ? 'This username is already in use. Please choose another.'
            : error.username[0]}
        </div>
      )}
    </div>
    <div>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {emailError && <div className="error-container">{emailError}</div>}
      {error?.email && (
        <div className="error-container">
          {error.email[0].includes('already exists')
            ? 'This email is already in use. Please use a different email.'
            : error.email[0]}
        </div>
      )}
    </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
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
         <div className="error-container">
          Failed to register. {error?.non_field_errors?.[0]}
        </div>
      )}
    </div>
  );
};

export default Register;