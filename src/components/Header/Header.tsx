'use client';
/* eslint-disable @next/next/no-img-element */

import { signIn, signOut, useSession} from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import './styles.css';
import { useState } from 'react';
import ConfirmationPopUp from '../ConfirmationPopUp/ConfirmationPopUp';

function Header() {
  const { data: session } = useSession();
  const [logoutPopUp, setLogoutPopUp] = useState(false);

  function handleClick() {
    const checkbox = document.getElementById('check') as HTMLInputElement;
    if (checkbox && checkbox.checked === true) {
      checkbox.checked = false;
    }
  }

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
    <header>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="bars">
        <FontAwesomeIcon icon={faBars} className="bars-icon" />
      </label>
      <label onClick={handleClick}>
        <Link href="/" className="header-logo">
          Lembretes
        </Link>
      </label>
      <ul>
        <li onClick={handleClick}>
          <Link href="/meus-dados" className="header-link">
            Meus dados
          </Link>
        </li>
        {session?.user ? (
        <>
          <li onClick={handleLogout}>
            <a className="header-link logout-link" >Sair</a>
          </li>
        </>
        ) : (
        <>
          <li onClick={handleClick}>
            <Link href="" className="header-link login-link" onClick={handleLogin}>
              Logar
            </Link>
          </li>
        </>
        )
        }
      </ul>
      <ConfirmationPopUp
        title={'Certeza?'}
        content={'Deseja mesmo sair de sua conta?'}
        trigger={logoutPopUp}
        setTrigger={setLogoutPopUp}
        onDialog={isSure}
      />
    </header>
  );
}

export default Header;







