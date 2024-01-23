import { User, Role } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User
    clientUser: ClientUser
    role: Role[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User
    role: Role[]
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     user: User;
//   }
// }

declare module NodeJS {
  interface ProcessEnv {
    SMPT_EMAIL: string;
    SMTP_GMAIL_PASS: string;
  }
}