'use client';
/* eslint-disable @next/next/no-img-element */

import { signIn, signOut, useSession} from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import './styles.css';

function Header() {
  const { data: session } = useSession();

  function handleClick() {
    const checkbox = document.getElementById('check') as HTMLInputElement;
    if (checkbox && checkbox.checked === true) {
      checkbox.checked = false;
    }
  }

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
            Home
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
            <Link href="/login" className="header-link" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
              Log Out
            </Link>
          </li>
        </>
        ) : (
        <>
          <li onClick={handleClick}>
            <Link href="/login" className="header-link" onClick={() => signIn()}>
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
    </header>
  );
}

export default Header;
