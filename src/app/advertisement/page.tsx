'use client';

import './styles.css';
import BooksContainer from '../components/BooksContainer/page';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { frontEndRedirect } from '@/utils/front-end-redirect';

function Advertisement() {
  const {data: session, status} = useSession();

  if (!session && status !== 'loading') {
    return frontEndRedirect();
  }

  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session) return null;

  return (
    <>
      <div className="advertisement-container">
        <Link href="/advertisement/register">
          <button className="advertisement-btn">Add a book to sell</button>
        </Link>
        <h1 className="advertisement-h">Your Advertisement</h1>
      </div>
      <BooksContainer></BooksContainer>
    </>
  );
}

export default Advertisement;
