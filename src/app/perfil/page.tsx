/* eslint-disable react/no-unescaped-entities */
'use client';

import { useSession } from 'next-auth/react';
import './styles.css';

import SideBar from '@/components/SideBar/SideBar';
import { frontEndRedirect } from '@/utils/front-end-redirect';
import { useEffect, useState } from 'react';

type UserLoginType = {
  email: string,
  password: string,
}

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
  const [user, setUser] = useState();
  const { data: session, status} = useSession();

  useEffect(() => {
    setLoading(true);
    (async function() {
      if (session?.jwt) {
        setUser(await fetchUser(session.jwt));
      }

      setLoading(false);
    })();
  });

  if (!session && status !== 'loading') {
    return frontEndRedirect('/');
  }

  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session) return null;

  return (
    <>
      <SideBar active='profile'></SideBar>
    </>
  );
}

export default Profile;
