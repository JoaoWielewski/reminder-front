/* eslint-disable react/no-unescaped-entities */
'use client';

import { useSession } from 'next-auth/react';
import './styles.css';

import LogIn from '@/components/LogIn/LogIn';
import SideBar2 from '@/components/SideBar2/SideBar2';
import { UserType } from '@/types/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const fetchUser = async (jwt: String) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/doctor`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    });
    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>();
  const { data: session, status} = useSession();

  useEffect(() => {
    setLoading(true);
    (async function() {
      if (session?.jwt) {
        setUser(await fetchUser(session.jwt));
      }

      setLoading(false);
    })();
  }, [session?.jwt]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      'pt-BR',
      {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
    );
  };

  return (
    <>
      <SideBar2 active='profile'></SideBar2>
      <LogIn></LogIn>
      <div className='profile-name'>Meu perfil</div>
      <div className='data-div'>
        <div className='data-name'>Meus dados</div>
        <div className='data-topic'>
          <div className='data-topic-name'>Quantidade de lembretes mensais: <a className='data-topic-info'>{user?.monthlyReminders}</a></div>
          <div className='data-topic-name'>Nome: <a className='data-topic-info'>{user?.name}</a></div>
          <div className='data-topic-name'>Email: <a className='data-topic-info'>{user?.email}</a></div>
          <div className='data-topic-name'>Celular: <a className='data-topic-info'>{user?.phone}</a></div>
          <div className='data-topic-name'>Especialidade: <a className='data-topic-info'>{user?.specialty}</a></div>
          <div className='data-topic-name'>Celular para agendamento: <a className='data-topic-info'>{user?.schedulePhone}</a></div>
          <div className='data-topic-name'>Conta criada em: <a className='data-topic-info'>{formatDate(user?.createdAt!)}</a></div>
        </div>
        <Link href="/meus-dados">
          <div className='modify-data'>ALTERAR DADOS</div>
        </Link>
      </div>
    </>
  );
}
export default Profile;
