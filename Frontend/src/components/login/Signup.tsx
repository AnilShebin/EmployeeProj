import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import AlertMessage from '../AlertMessage';
import Footer from '../nav/Footer'; // Import your Footer component here

const SignUp: React.FC = () => {
  const [employeeName, setEmployeeName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeName || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    fetch(`http://localhost:8080/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        employeeName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setSuccessMessage('Registered successfully.');
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setErrorMessage('The email ID already exists.');
        }
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        setErrorMessage('Error during registration');
      });
  };

  return (
    <div className="container" id="loginbox" style={{ marginBottom: '100px' }}>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>

            <p className="forgot-password text-right">
              Already registered
              <Link className="link-signin ms-1" to={'/login'}>
                Sign in?
              </Link>
            </p>
          </form>
          {successMessage && (
            <AlertMessage
              message={successMessage}
              type="success"
              onClose={() => setSuccessMessage('')}
            />
          )}
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

export default SignUp;
