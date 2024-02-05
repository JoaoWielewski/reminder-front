'use client';

import Image from 'next/image';
import Link from 'next/link';
import './styles.css';


function SideBarBig() {
  return (
    <div className='logo-div'>
        <Image src={'/images/lembra+.png'} alt={''} width={110} height={110} className='lembra-big'/>
        <Link href="/" className="sidebar-header-big">
          LEMBRA+
        </Link>
    </div>
  );
}

export default SideBarBig;







