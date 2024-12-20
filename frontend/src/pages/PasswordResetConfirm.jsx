import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import '../styles/PasswordResetConfirm.css';

const PasswordResetConfirm = () => {
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { token: pathToken } = useParams(); // Extract token from the URL path

  useEffect(() => {
    // Check if the token is in the query params or URL path
    const params = new URLSearchParams(location.search);
    const queryToken = params.get('token');

    if (!pathToken && !queryToken) {
      setErrorMessages(['Token is missing. Please check the reset link.']);
    }
  }, [location.search, pathToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = pathToken || new URLSearchParams(location.search).get('token');

    if (!token) {
      setErrorMessages(['Token is missing. Please check the reset link.']);
      return;
    }

    try {
      await axiosInstance.post('password_reset/confirm/', { token, password });
      setStatusMessage('Your password has been successfully reset.');
      setErrorMessages([]);
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (error) {
      if (error.response && error.response.data) {
        const responseErrors = error.response.data;
        setErrorMessages(
          responseErrors.password || responseErrors.token || ['An unexpected error occurred. Please try again.']
        );
      } else {
        setErrorMessages(['An unexpected error occurred. Please try again.']);
      }
      setStatusMessage('');
    }
  };

  return (
    <div className="password-reset-confirm-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {statusMessage && <p className="success-message">{statusMessage}</p>}
      {errorMessages.length > 0 && (
        <ul className="error-message">
          {errorMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordResetConfirm;
