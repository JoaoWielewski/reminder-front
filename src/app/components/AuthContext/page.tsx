'use client';

import { SessionProvider } from 'next-auth/react';

function AuthContext({ children, session }: { children: React.ReactNode, session: any}) {
  return (
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
  );
}

export default AuthContext;
