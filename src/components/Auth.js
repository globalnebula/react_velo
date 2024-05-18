import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Auth.css';

const Auth = ({ setToken }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your Auth logic here
    // For example, you can send a POST request to your server with the phone number and password
    // Once you receive the token from the server, you can call the setToken function to update the token in the parent component
  };

  return (
    <div className="form">
      <div className="form-control">
        <input
          type="text"
          maxLength="10"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label>
          <span style="transition-delay:0ms">P</span>
          <span style="transition-delay:50ms">h</span>
          <span style="transition-delay:100ms">o</span>
          <span style="transition-delay:150ms">n</span>
          <span style="transition-delay:200ms">e</span>
          <span style="transition-delay:250ms"> </span>
          <span style="transition-delay:300ms">n</span>
          <span style="transition-delay:350ms">u</span>
          <span style="transition-delay:400ms">m</span>
          <span style="transition-delay:450ms">b</span>
          <span style="transition-delay:500ms">e</span>
          <span style="transition-delay:550ms">r</span>
        </label>
      </div>
      <div className="form-control">
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <span style="transition-delay:0ms">P</span>
          <span style="transition-delay:50ms">a</span>
          <span style="transition-delay:100ms">s</span>
          <span style="transition-delay:150ms">s</span>
          <span style="transition-delay:200ms">w</span>
          <span style="transition-delay:250ms">o</span>
          <span style="transition-delay:300ms">r</span>
          <span style="transition-delay:350ms">d</span>
        </label>
      </div>
      <button onClick={handleSubmit}> Log In </button>
    </div>
  );
};

Auth.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Auth;