/* eslint-disable react/no-unescaped-entities */
'use client';

import './styles.css';
import Link from 'next/link';
import LoginContainer from '../components/LoginContainer/page';

function Login() {
  return (
    <LoginContainer>
      <form>
        <h1 className="login-h1">Log into your account</h1>
        <div className="login-input-div">
          <input type="text" className="login-input login-email" placeholder=" " />
          <p className="login-p login-p-email">Email</p>
        </div>
        <div className="login-input-div">
          <input type="password" className="login-input login-password" placeholder=" " />
          <p className="login-p login-p-password">Password</p>
        </div>
        <button className="login-btn">Log In</button>
        <p className="create-account">
          Don't have an account? <Link href="/signup">Create an account</Link>
        </p>
      </form>
    </LoginContainer>
  );
}

export default Login;
