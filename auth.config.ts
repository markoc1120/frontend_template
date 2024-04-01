import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }
      return true
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.username = token.user.user.username
        session.user.fullName = token.user.user.first_name
        session.user.lastName = token.user.user.last_name
        session.user.email = token.user.user.email
        session.key = token.user.key
      }
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
