
import { React, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  // ── State variables bound to input fields ─────────────────
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert,    setAlert]    = useState({ type: '', message: '' });

  const navigate = useNavigate();

  // ── Front-end API endpoint for login ──────────────────────
  const handleLogin = (event, username, password) => {
    if (!username || !password) {
      setAlert({ type: 'error', message: 'Please enter your User ID and password.' });
      return;
    }

    axios.get('http://localhost:9000/getUser', { params: { username, password } })
      .then((res) => {
        if (res.data) {
          setAlert({ type: 'success', message: `Login Successful! Welcome back, ${res.data.firstName}.` });
        } else {
          setAlert({ type: 'error', message: 'Wrong Credentials' });
        }
      })
      .catch((err) => alert('Error in Login'));
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
          <h1 className="card-title">Welcome back</h1>
          <p className="card-subtitle">Sign in to your campus account to manage your items.</p>

          <div className="divider"></div>

          {/* Alert Banner */}
          {alert.message && (
            <div className={`alert ${alert.type}`} role="alert">
              {alert.message}
            </div>
          )}

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
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn-submit"
            onClick={(event) => handleLogin(event, username, password)}
          >
            Sign In
          </button>

          <p className="card-footer">
            Don't have an account?&nbsp;
            <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>
              Create one
            </a>
          </p>
        </div>

        <p className="tagline">University of Albany &nbsp;·&nbsp; Spring 2026</p>

      </div>
    </>
  );
}

export default Login