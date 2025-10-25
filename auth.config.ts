import type { NextAuthConfig } from 'next-auth';

export const authConfig = {

  pages: {
    signIn: '/api/auth/signin',
  },
  callbacks: {

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPanel = nextUrl.pathname.startsWith('/admin');

      if (isOnAdminPanel) {
        if (isLoggedIn) {

          if (auth.user?.role === 'ADMIN') {
            return true;
          }
          return false;
        }
        return false;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;