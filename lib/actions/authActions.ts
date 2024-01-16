"use server";

import { User } from "@prisma/client";

import * as bcrypt from "bcrypt";
import {
  compileActivationTemplate,
  compileResetPassTemplate,
  sendMail,
} from "../mail";
import { signJwt, verifyJwt } from "../jwt";
import { prisma } from "@/lib/prisma"; 
import { excludedDomains } from "../excludedDomains";

type Email = string;

function extractEmailDomain(email: Email): string {
  const [user, domain] = email.toLowerCase().split('@');
  const domainParts = domain.split('.');

  // Check if the domain is not in the excluded list
  if (!excludedDomains.includes(domainParts[0])) {
    return domainParts[0];
  } 

  const isolatedDomain = domainParts[0];
  return isolatedDomain;
}


export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image">
) {

  // Client & role logic
  const domain = extractEmailDomain(user.email);
  console.log("domain", domain)
  // Check if client exists
  let client = await prisma.client.findUnique({
    where: { 
      clientId: domain 
    },
  });
  // If client doesn't exist, create a new one
  if (!client) {
    client = await prisma.client.create({
      data: {       
        clientId: domain 
      },
    });
  }

  const result = await prisma.user.create({
    data: {
      ...user,
      role: user.role ? user.role : "user",
      Client: { connect: { id: client.id } },
      password: await bcrypt.hash(user.password, 10),
    },
  });

  const jwtUserId = signJwt({
    id: result.id,
  });
  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
  const body = compileActivationTemplate(user.name, activationUrl);
  await sendMail({ to: user.email, subject: "Activate your account", body });
  // const isolatedDomain = extractEmailDomain(user.email);
  // console.log("domain", isolatedDomain)
  return result;
}

type ActivateUserFunc = (
  jwtUserId: string
) => Promise<"userNotExist" | "alreadyActivated" | "success">;

export const activateUser: ActivateUserFunc = async (jwtUserID) => {
  const payload = verifyJwt(jwtUserID);
  const userId = payload?.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  // const client = await prisma.client
  if (!user) return "userNotExist";
  if (user.emailVerified) return "alreadyActivated";
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });
  return "success";
};

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new Error("The user does not exist");

  const jwtUserId = signJwt({
    id: user.id,
  });
  const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPass/${jwtUserId}`;
  const body = compileResetPassTemplate(user.name, resetPassUrl);
  const sendResult = await sendMail({
    to: user.email,
    subject: "Reset password",
    body: body,
  });
  return sendResult;
}

type ResetPasswordFucn = (
  jwtUserId: string,
  password: string
) => Promise<"userNotExist" | "success">;

export const resetPassword: ResetPasswordFucn = async (jwtUserId, password) => {
  const payload = verifyJwt(jwtUserId);
  if (!payload) return "userNotExist";
  const userId = payload.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) return "userNotExist";

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: await bcrypt.hash(password, 10),
    },
  });
  if (result) return "success";
  else throw new Error("Something went wrong!");
};

/*
domain arrixa
 ⨯ PrismaClientValidationError: 
Invalid `prisma.client.findUnique()` invocation:

{
  where: {
    clientId: "arrixa",
?   id?: String,
?   AND?: ClientWhereInput | ClientWhereInput[],
?   OR?: ClientWhereInput[],
?   NOT?: ClientWhereInput | ClientWhereInput[],
?   role?: StringFilter | String,
?   userId?: UserListRelationFilter
  }
}

Argument `where` of type ClientWhereUniqueInput needs at least one of `id` arguments. Available options are marked with ?.
    at async registerUser (./lib/actions/authActions.ts:34:18)
*/