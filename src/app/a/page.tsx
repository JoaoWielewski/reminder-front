'use client';

import RemindersContainer from '@/components/RemindersContainer/RemindersContainer';
import './styles.css';
import { frontEndRedirect } from '@/utils/front-end-redirect';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LogIn from '@/components/LogIn/LogIn';

function Home() {
  const {data: session, status} = useSession();

  if (!session && status !== 'loading') {
    return frontEndRedirect('/');
  }

  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session) return null;

  return (
    <>
      <LogIn></LogIn>
    </>
  );
}

export default Home;
