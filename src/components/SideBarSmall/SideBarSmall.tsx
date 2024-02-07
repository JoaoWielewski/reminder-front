'use client';

import Image from 'next/image';
import Link from 'next/link';
import './styles.css';


function SideBarSmall() {
  return (
    <div>
      <div>
        <Image src={'/images/lembra+.png'} alt={''} width={70} height={70} className='lembra'/>
        <Link href="/painel" className="sidebar-header">
          LEMBRA+
        </Link>
      </div>
    </div>
  );
}

export default SideBarSmall;







