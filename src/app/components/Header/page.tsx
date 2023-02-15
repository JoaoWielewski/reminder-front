'use client';
/* eslint-disable @next/next/no-img-element */

import { signIn, signOut, useSession} from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import './styles.css';
import { useState } from 'react';
import ConfirmationPopUp from '../ConfirmationPopUp/page';

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

  return (
    <header>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="bars">
        <FontAwesomeIcon icon={faBars} className="bars-icon" />
      </label>
      <label onClick={handleClick}>
        <Link href="/" className="header-logo">
          BookStore
        </Link>
      </label>
      <ul>
        <li onClick={handleClick}>
          <Link href="/" className="header-link">
            Catalog
          </Link>
        </li>
        <li onClick={handleClick}>
          <Link href="/advertisement" className="header-link">
            Your Advertisement
          </Link>
        </li>
        <li className="mobile-cart" onClick={handleClick}>
          <Link href="/cart" className="header-link">
            Cart
          </Link>
        </li>
        {session?.user ? (
        <>
          <li onClick={handleClick}>
            <Link href="" className="header-link" onClick={handleLogout}>
              Log Out
            </Link>
          </li>
        </>
        ) : (
        <>
          <li onClick={handleClick}>
            <Link href="" className="header-link" onClick={() => signIn()}>
              Log In
            </Link>
          </li>
        </>
        )
        }
        <li onClick={handleClick}>
          <Link href="/cart" className="header-cart">
            <p className="cart-p">Cart</p>
            <FontAwesomeIcon icon={faCartShopping} className="cart" />
          </Link>
        </li>
      </ul>
      <ConfirmationPopUp
        title={'Sure?'}
        content={'Are you sure you want to log out?'}
        trigger={logoutPopUp}
        setTrigger={setLogoutPopUp}
        onDialog={isSure}
      />
    </header>
  );
}

export default Header;
