import { User } from "@prisma/client";

declare module "next-auth" {
  interface User {
    username: string
  }
  interface Session {
    user: User & {
      username: string
    }
    token: {
      username: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}