import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/api/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPanel = nextUrl.pathname.startsWith('/admin');
      const userRole = auth?.user?.role;

      if (isOnAdminPanel) {
        console.log("🛡️  [MIDDLEWARE] Admin Kontrolü:");
        console.log(`   -> Rol: '${userRole}'`);
        console.log(`   -> Giriş: ${isLoggedIn}`);
      }

      if (isOnAdminPanel) {
        if (isLoggedIn) {
          return userRole === 'ADMIN';
        }
        return false;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        console.log("✅ [JWT] Rol Token'a yazılıyor:", user.role);
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        // @ts-ignore
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
