'use client';

import { faCirclePlus, faFileLines, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import './styles.css';

type SideBarType = {
  active: string
}

function SideBar(props: SideBarType) {
  return (
    <div>
      <div>
        <Image src={'/images/lembra+.png'} alt={''} width={70} height={70} className='lembra'/>
        <Link href="/painel" className="sidebar-header">
          LEMBRA+
        </Link>
      </div>
      <div className="sidebar-divider"></div>

      {props.active === 'dashboard' ?
      <div className='sidebar-item sidebar-item1 active-item'>
        <FontAwesomeIcon icon={faHouse} className="active-icon" />
        <div className='active-sidebar-text'>Painel principal</div>
      </div> :
      <Link href='/painel' className='sidebar-item sidebar-item1 inactive-item'>
        <FontAwesomeIcon icon={faHouse} className="inactive-icon" />
        <div className='inactive-sidebar-text'>Painel principal</div>
      </Link>}

      {props.active === 'schedule' ?
      <div className='sidebar-item sidebar-item2 active-item'>
        <FontAwesomeIcon icon={faCirclePlus} className="active-icon active-icon-plus" />
        <div className='active-sidebar-text'>Agendar lembrete</div>
      </div> :
      <Link href='/agendar' className='sidebar-item sidebar-item2 inactive-item'>
        <FontAwesomeIcon icon={faCirclePlus} className="inactive-icon inactive-icon-plus" />
        <div className='inactive-sidebar-text'>Agendar lembrete</div>
      </Link>}

      {props.active === 'plans' ?
      <div className='sidebar-item sidebar-item3 active-item'>
        <FontAwesomeIcon icon={faFileLines} className="active-icon active-icon-plus" />
        <div className='active-sidebar-text'>Adquirir lembretes</div>
      </div> :
      <Link href='/planos' className='sidebar-item sidebar-item3 inactive-item'>
        <FontAwesomeIcon icon={faFileLines} className="inactive-icon inactive-icon-plus" />
        <div className='inactive-sidebar-text'>Adquirir lembretes</div>
      </Link>}

      {props.active === 'profile' ?
      <div className='sidebar-item sidebar-item4 active-item'>
        <FontAwesomeIcon icon={faUser} className="active-icon active-icon-user" />
        <div className='active-sidebar-text'>Meu perfil</div>
      </div> :
      <Link href='perfil' className='sidebar-item sidebar-item4 inactive-item'>
        <FontAwesomeIcon icon={faUser} className="inactive-icon inactive-icon-user" />
        <div className='inactive-sidebar-text'>Meu perfil</div>
      </Link>}

    </div>
  );
}

export default SideBar;







