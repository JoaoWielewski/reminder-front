'use client';
/* eslint-disable @next/next/no-img-element */
import './styles.css';
import CartContainer from '../components/CartContainer/page';
import { useSession } from 'next-auth/react';
import { frontEndRedirect } from '@/utils/front-end-redirect';
import { useContext } from 'react';
import { CartContext } from '../components/CartContext/page';

function Cart() {
  const {data: session, status} = useSession();
  const { items } = useContext(CartContext);

  if (!session && status !== 'loading') {
    return frontEndRedirect('/cart');
  }

  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session) return null;

  console.log(items);

  return <CartContainer></CartContainer>;
}

export default Cart;
