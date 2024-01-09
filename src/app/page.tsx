'use client';

import LogIn from '@/components/LogIn/LogIn';
import './styles.css';
import SideBar from '@/components/SideBar/SideBar';
import Dashboard from '@/components/Dashboard/Dashboard';
import { useSession } from 'next-auth/react';
import { frontEndRedirect } from '@/utils/front-end-redirect';

function Home() {
  const {data: session, status} = useSession();

  if (!session && status !== 'loading') {
    return frontEndRedirect('/');
  }

  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session) return null;


  return (
    <>
      <SideBar active='dashboard'></SideBar>
      <LogIn></LogIn>
      <Dashboard></Dashboard>
    </>
  );
}

export default Home;
