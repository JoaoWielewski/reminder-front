'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import ConfirmationPopUp from '../ConfirmationPopUp/ConfirmationPopUp';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
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
          <div onClick={handleLogout}>
            <FontAwesomeIcon icon={faUser} className="user-icon" />
            <a className="login-link" >Sair</a>
          </div>
        </>
        ) : (
        <>
          <div>
            <Link href="" className="login-link" onClick={handleLogin}>
              Entrar
            </Link>
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

export default Header;







