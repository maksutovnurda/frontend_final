import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import "../styles/PasswordResetRequests.css";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('password_reset/', { email });
      setStatusMessage('A password reset link has been sent to your email.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to send reset email. Please try again.');
      setStatusMessage('');
    }
  };

  return (
    <div className="password-reset-request-container">
      <h2>Forgot Password?</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      {statusMessage && <p style={{ color: 'green' }}>{statusMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default PasswordResetRequest;
