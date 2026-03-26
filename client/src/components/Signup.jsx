
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  // ── State variables bound to input fields ─────────────────
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [username,  setUsername]  = useState('');
  const [password,  setPassword]  = useState('');
  const [alert,     setAlert]     = useState({ type: '', message: '' });

  const navigate = useNavigate();

  // ── Front-end API endpoint for signup ─────────────────────
  const handleSignUp = (event, firstName, lastName, username, password) => {
    // Basic validation
    if (!firstName || !lastName || !username || !password) {
      setAlert({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    axios.post('http://localhost:9000/createUser', { firstName, lastName, username, password })
      .then((res) => {
        setAlert({ type: 'success', message: `Account created! Welcome, ${firstName}.` });
        // Clear fields
        setFirstName('');
        setLastName('');
        setUsername('');
        setPassword('');
      })
      .catch((err) => {
        const msg = err.response?.data || 'Error in Signing Up';
        setAlert({ type: 'error', message: msg });
      });
  };

  return (
    <>
      <div className="bg-ring"></div>

      <div className="page-wrapper">

        {/* Brand */}
        <div className="brand">
          <div className="brand-logo">🎒</div>
          <span className="brand-name">College Cache</span>
          <span className="brand-sub">Campus Lost &amp; Found</span>
        </div>

        {/* Card */}
        <div className="card">
          <h1 className="card-title">Create account</h1>
          <p className="card-subtitle">Join your campus community to report and recover lost items.</p>

          <div className="divider"></div>

          {/* Alert Banner */}
          {alert.message && (
            <div className={`alert ${alert.type}`} role="alert">
              {alert.message}
            </div>
          )}

          {/* Name row */}
          <div className="field-row">
            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="Jane"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Smith"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="username">User ID</label>
            <input
              type="text"
              id="username"
              placeholder="e.g. jsmith@albany.edu"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn-submit"
            onClick={(event) => handleSignUp(event, firstName, lastName, username, password)}
          >
            Create Account
          </button>

          <p className="card-footer">
            Already have an account?&nbsp;
            <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
              Sign in
            </a>
          </p>
        </div>

        <p className="tagline">University of Albany &nbsp;·&nbsp; Spring 2026</p>

      </div>
    </>
  );
}

export default Signup