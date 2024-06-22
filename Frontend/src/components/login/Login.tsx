import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './login.css';
import { useAuth } from './AuthContext';
import AlertMessage from '../AlertMessage';
import Footer from '../nav/Footer'; // Import your Footer component here

const Login: React.FC = () => {
  const [email, setemail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('https://employee-proj-eight.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      login(data.token);

      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Incorrect email or password');
    }
  };

  return (
    <div className="container" id="loginbox">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                  setErrorMessage('');
                }}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </button>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>

            <p className="forgot-password text-right">
              New Registration
              <Link className="link ms-1" to={'/signup'}>
                Sign Up
              </Link>
            </p>
          </form>
          {errorMessage && (
            <AlertMessage
              message={errorMessage}
              type="error"
              onClose={() => setErrorMessage('')}
            />
          )}
        </div>
      </div>
      <Footer /> {/* Include your Footer component here */}
      <style>
        {`
        body {
          background: linear-gradient(to right, lightblue, #ffffff);
        }
      `}
      </style>
    </div>
  );
};

export default Login;
