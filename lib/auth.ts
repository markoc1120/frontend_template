import axios from "axios"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios({
            url: process.env.NEXTAUTH_BACKEND_URL + "auth/login/",
            method: "post",
            data: credentials,
            headers: { "Content-Type": "application/json" },
          })
          const data = response?.data
          if (data) return data
        } catch (error) {
          console.log(error)
        }
        return null
      },
    }),
  ],
  callbacks: {
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
  secret: process.env.NEXTAUTH_SECRET,
}
