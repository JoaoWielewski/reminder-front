'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode
}

function AuthContext({ children}: IProps) {
  return (
      <SessionProvider>
        {children}
      </SessionProvider>
  );
}

export default AuthContext;
