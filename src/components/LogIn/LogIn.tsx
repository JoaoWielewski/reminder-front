'use client';

import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import ConfirmationPopUp from '../ConfirmationPopUp/ConfirmationPopUp';
import './styles.css';

function LogIn() {
  const { data: session } = useSession();
  const [logoutPopUp, setLogoutPopUp] = useState(false);

  const isSure = (sure: boolean) => {
    if (sure) {
      signOut({ callbackUrl: '/', redirect: true });
    }
  };

  const handleLogout = () => {
    setLogoutPopUp(true);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    signIn();
  };

  return (
    <>
        {session?.user ? (
        <>
          <div onClick={handleLogout} className='z-index-5'>
            <FontAwesomeIcon icon={faRightFromBracket} className="bracket-icon" />
            <a className="login-link" >Sair</a>
          </div>
        </>
        ) : (
        <>
          <div>
            <div onClick={handleLogin} className='z-index-5'>
              <FontAwesomeIcon icon={faUser} className="user-icon" />
              <a className="login-link" >Entrar</a>
            </div>
          </div>
        </>
        )
        }
      <ConfirmationPopUp
        title={''}
        content={'Deseja mesmo sair de sua conta?'}
        trigger={logoutPopUp}
        setTrigger={setLogoutPopUp}
        onDialog={isSure}
      />
      </>
  );
}

export default LogIn;







