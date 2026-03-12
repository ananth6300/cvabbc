import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../config';
import './OwnerLogin.css';

const OwnerLogin = () => {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(apiUrl('/api/auth/login'), {
        passkey
      });

      // Store token in localStorage
      localStorage.setItem('ownerToken', response.data.token);
      
      // Redirect to dashboard
      navigate('/owner/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid passkey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="owner-login-page">
      <div className="container section">
        <div className="login-container">
          <div className="login-card">
            <h2>Owner Login</h2>
            <p className="login-subtitle">Enter your passkey to access the dashboard</p>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="passkey">Passkey</label>
                <input
                  type="password"
                  id="passkey"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  required
                  placeholder="Enter passkey"
                  autoFocus
                />
              </div>

              {error && (
                <div className="message error">{error}</div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary login-btn"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;

