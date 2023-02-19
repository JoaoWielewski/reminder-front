'use client';

import './styles.css';
import BooksContainer from '../components/BooksContainer/BooksContainer';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { frontEndRedirect } from '@/utils/front-end-redirect';

function Advertisement() {
  const {data: session, status} = useSession();

  if (!session && status !== 'loading') {
    return frontEndRedirect('/advertisement');
  }

  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session) return null;

  return (
    <>
      <div className="advertisement-container">
        <h1 className="advertisement-h1">Your Books</h1>
        <Link href="/advertisement/register">
          <button className="advertisement-btn">Add a book to sell</button>
        </Link>
      </div>
      <BooksContainer advertisement={true}></BooksContainer>
    </>
  );
}

export default Advertisement;
