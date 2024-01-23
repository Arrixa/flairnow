import * as bcrypt from 'bcryptjs';
import { prisma } from "@/lib/prisma"; 
import { excludedDomains } from "@/lib/excludedDomains";
import { NextResponse } from "next/server";
import { signJwt, verifyJwt } from "@/lib/jwt";
import { compileActivationTemplate, compileResetPassTemplate, sendMail } from "@/lib/mail";
// import Role from "@/lib/prisma"
import { Role } from "@prisma/client";

type Email = string;

function extractEmailDomain(email: Email): string {
  const [user, domain] = email.toLowerCase().split('@');
  const domainParts = domain.split('.');
  // Check if the domain is not in the excluded list
  console.log(domainParts)
  if (!excludedDomains.includes(domainParts[0])) {
    return domainParts[0];
  } 
  const isolatedDomain = domainParts[0];
  console.log(isolatedDomain)
  return isolatedDomain;
}


const isDomainInExcludedList = (domain: string): boolean => {
  return excludedDomains.includes(domain);
}


export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { emailVerified, image, id, ...user } = reqBody;
    console.log(reqBody)

    // Check if user email exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    })
    if (existingUserByEmail) {
      return NextResponse.json({ user: null, message: "User with this email already exists. Please signin"})
    }

      // New user
      const newUser = await prisma.user.create({
      data: {
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }
    });

    // Check if client domain exists
    const domain = extractEmailDomain(user.email);
    console.log("domain", domain)
    
    // Check if the domain is part of the excluded list (public domains)
    const isPublicDomain = isDomainInExcludedList(domain);
    console.log(isPublicDomain)

    if (!isPublicDomain) {
      let roles = [];
      let client;
  
      if (!isPublicDomain) {
        const existingClientByDomain = await prisma.client.findUnique({
          where: { 
            domain: domain 
          },
        });
  
        if (!existingClientByDomain) {
          client = await prisma.client.create({ 
            data: { 
              domain: domain 
            } 
          });
          roles.push(Role.ADMIN, Role.EMPLOYEE);
        } else {
          client = existingClientByDomain;
          roles.push(Role.EMPLOYEE);
        }
      }
  
      if (roles.length === 0) {
        // If roles are not assigned, assume some default role, e.g., USER
        roles.push(Role.UNASSIGNED);
      }
  
      console.log('Roles:', roles);
      console.log('Client:', client);
  
      // New record in ClientUser table
      const newClientUser = await prisma.clientUser.create({
        data: {
          client: { connect: { id: client.id } },
          user: { connect: { id: newUser.id } },
          role: roles,
        },
      });
      
    }

    const jwtUserId = signJwt({
          id: newUser.id,
        });
        const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
        const body = compileActivationTemplate(user.username, activationUrl);
        await sendMail({ to: user.email, subject: "Activate your account", body });
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json({ user: rest, message: "User created successfully"}, { status: 201 })

  } catch (error) {
    console.error("Error during user creation:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }

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
  try {
    const sendResult = await sendMail({
      to: user.email,
      subject: "Reset password",
      body: body,
    });
    return sendResult;    
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send reset password email");
  }
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
