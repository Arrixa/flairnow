import { User, Role, ClientUser, Client } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { StringValidation } from "zod";

declare module "next-auth" {
  interface Session {
    user?: User
    clientUser?: ClientUser
    // role: string[]
    client?: Client
    firstName?: string
    lastName?: string
    email?: string
    userDomain?: string
    role: Role[]
    expires: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User
    clientUser?: ClientUser
    role: Role[]
    client?: Client
  }
}

declare module NodeJS {
  interface ProcessEnv {
    SMPT_EMAIL: string;
    SMTP_GMAIL_PASS: string;
  }
}

export default interface File {
  id: string;
  filename: string;
  fileType: string;
  fileSize: number;
  downloadCount: number;
  filePath: string;
  createdAt: number;
}
