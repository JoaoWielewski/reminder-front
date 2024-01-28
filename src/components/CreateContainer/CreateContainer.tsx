import React from 'react';
import './styles.css';

function CreateContainer({ children, title}: { children: React.ReactNode, title: string}) {
  return (
    <div className="create-flex">
      <div className="create-container">
        <h1 className="register-h1">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default CreateContainer;
