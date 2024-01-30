import React from 'react';
import './styles.css';

function LoginContainer({ children, title}: { children: React.ReactNode, title: string}) {
  return (
    <div className="login-flex-login">
      <div className="login-container-login">
        <h1 className="register-h1-login">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default LoginContainer;
