import "next-auth/jwt"

import { User } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: User & {
      firstName: string
      lastName: string
      username: string
    }
  }
}
