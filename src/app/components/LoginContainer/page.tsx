import React from 'react';
import './styles.css';

function LoginContainer({ children }: { children: React.ReactNode }) {
  return <div className="login-container">{children}</div>;
}

export default LoginContainer;
