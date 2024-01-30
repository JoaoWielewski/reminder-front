/* eslint-disable jsx-a11y/alt-text */
'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import './styles.css';

import LogIn from '@/components/LogIn/LogIn';
import SideBar2 from '@/components/SideBar2/SideBar2';

function Plans() {
  const { data: session, status} = useSession();


  return (
    <>
      <SideBar2 active='plans'></SideBar2>
      <LogIn></LogIn>
      <div className='plans-name'>Adquirir lembretes</div>
      <div className='plans-div'>
        <div className='plans-div-name'>Entrar em contato para adquirir lembretes</div>
          <div className='plans-topic'>
            <div className='plans-topic-name'>• <a className='plans-topic-info'>Leia o QR Code para entrar em contato</a></div>
            <div className='plans-topic-name'><a className='plans-topic-info'>ou</a></div>
            <div className='plans-topic-name'>• <a className='plans-topic-info'>Clique no botão abaixo para entrar em contato</a></div>
          </div>
        <a href='https://wa.link/xv58nm/' target="_blank" rel="noreferrer" className='plans-btn'>Entrar em contato</a>
        <Image src={'/images/whatsapp.png'} alt={''} width={200} height={200} className='qr-code'/>
      </div>
    </>
  );
}
export default Plans;
