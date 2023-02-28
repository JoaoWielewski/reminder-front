'use client';
/* eslint-disable @next/next/no-img-element */
import './styles.css';
import CartContainer from '@/components/CartContainer/CartContainer';
import { useSession } from 'next-auth/react';
import { frontEndRedirect } from '@/utils/front-end-redirect';


function Cart() {
  const {data: session, status} = useSession();

  if (!session && status !== 'loading') {
    return frontEndRedirect('/cart');
  }

  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session) return null;

  return <CartContainer></CartContainer>;
}

export default Cart;
