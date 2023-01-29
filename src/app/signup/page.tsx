'use client';

import './styles.css';
import LoginContainer from '../components/LoginContainer/page';
import { useState } from 'react';
import { getEnvVar } from '@/utils/utils';

function Signup() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit() {
    const params = {
      name: userName,
      password: userPassword,
    };

    const backendUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL!;

    fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  }

  return (
    <LoginContainer>
      <h1 className="login-h1">Register your account</h1>
      <div className="login-input-div">
        <input type="text" className="login-input login-email" placeholder=" " onChange={(e) => {
          setUserName(e.target.value);
        }}
        />
        <p className="login-p login-p-email">Email</p>
      </div>
      <div className="login-input-div">
        <input type="password" className="login-input login-password" placeholder=" " onChange={(e) => {
          setUserPassword(e.target.value);
        }}
        />
        <p className="login-p login-p-password">Password</p>
      </div>
      <div className="login-input-div">
        <input type="password" className="login-input login-confirm-password" placeholder=" " onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        />
        <p className="login-p login-p-confirm-password">Confirm password</p>
      </div>
      <button className="login-btn" onClick={handleSubmit}>Sign Up</button>
    </LoginContainer>
  );
}

export default Signup;
