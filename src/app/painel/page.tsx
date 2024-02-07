'use client';

import Dashboard from '@/components/Dashboard/Dashboard';
import LogIn from '@/components/LogIn/LogIn';
import SideBar from '@/components/SideBar/SideBar';
import { frontEndRedirect } from '@/utils/front-end-redirect';
import { useSession } from 'next-auth/react';
import './styles.css';

function Painel() {
  const {data: session, status} = useSession();

  if (!session && status !== 'loading') {
    return frontEndRedirect('/painel');
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

export default Painel;
