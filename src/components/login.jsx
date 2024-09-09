import React, { useState, useEffect } from 'react';
import "../styles/login.css"; // Importing the separate CSS file

const LoginPage = () => {
  // State for userId and password
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [userCaptchaInput, setUserCaptchaInput] = useState('');

  // Function to generate a random CAPTCHA
  const generateCaptcha = () => {
    const charsArray = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const lengthOtp = 5;
    let captcha = '';
    for (let i = 0; i < lengthOtp; i++) {
      const index = Math.floor(Math.random() * charsArray.length);
      captcha += charsArray[index];
    }
    return captcha;
  };

  // Function to refresh the CAPTCHA
  const handleCaptchaRefresh = () => {
    setCaptchaValue(generateCaptcha());
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userCaptchaInput === captchaValue) {
      alert(`Login successful! UserId: ${userId}, Password: ${password}`);
    } else {
      alert('Incorrect CAPTCHA!');
    }
  };

  // Generate CAPTCHA on page load
  useEffect(() => {
    setCaptchaValue(generateCaptcha());
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Employee Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="userId">User Id</label>
            <input 
              type="text" 
              id="userId" 
              name="userId" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="captcha-group">
            <label htmlFor="captcha">CAPTCHA</label>
            <div className="captcha-box">
              <span className="captcha-value">{captchaValue}</span>
              <button 
                type="button" 
                className="refresh-captcha" 
                onClick={handleCaptchaRefresh}
              >
                ↻
              </button>
            </div>
            <input
              type="text"
              id="captcha"
              placeholder="Enter CAPTCHA"
              value={userCaptchaInput}
              onChange={(e) => setUserCaptchaInput(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
