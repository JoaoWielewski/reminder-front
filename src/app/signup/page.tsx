'use client';

import './styles.css';
import LoginContainer from '../components/LoginContainer/page';

function Signup() {
  return (
    <LoginContainer>
      <h1 className="login-h1">Register your account</h1>
      <div className="login-input-div">
        <input type="text" className="login-input login-email" placeholder=" " />
        <p className="login-p login-p-email">Email</p>
      </div>
      <div className="login-input-div">
        <input type="password" className="login-input login-password" placeholder=" " />
        <p className="login-p login-p-password">Password</p>
      </div>
      <div className="login-input-div">
        <input type="password" className="login-input login-confirm-password" placeholder=" " />
        <p className="login-p login-p-confirm-password">Confirm password</p>
      </div>
      <button className="login-btn">Sign Up</button>
    </LoginContainer>
  );
}

export default Signup;
