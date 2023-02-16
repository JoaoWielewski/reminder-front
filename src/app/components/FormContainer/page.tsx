import React from 'react';
import './styles.css';

function FormContainer({ children, title}: { children: React.ReactNode, title: string}) {
  return (
    <div className="login-container">
      <h1 className="register-h1">{title}</h1>
      {children}
    </div>
  );
}

export default FormContainer;
