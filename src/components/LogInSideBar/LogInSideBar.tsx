'use client';

import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import ConfirmationPopUp from '../ConfirmationPopUp/ConfirmationPopUp';
import './styles.css';

function LogInSideBar() {
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
      <div onClick={handleLogout} className='z-index-5-side'>
        <FontAwesomeIcon icon={faRightFromBracket} className="bracket-icon-side" />
        <a className="login-link-side" >Sair da conta</a>
      </div>
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

export default LogInSideBar;







