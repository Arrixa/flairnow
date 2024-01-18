import * as bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma"; 
import { excludedDomains } from "@/lib/excludedDomains";
import { NextResponse } from "next/server";
import { signJwt, verifyJwt } from "@/lib/jwt";
import { compileActivationTemplate, sendMail } from "@/lib/mail";

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


export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { emailVerified, image, id, ...user } = reqBody;
    console.log(reqBody)

    // Check if client domain exists
    const domain = extractEmailDomain(user.email);
    console.log("domain", domain)
    const existingClientByDomain = await prisma.client.findUnique({
      where: {
        domain: domain
      }
    })
    if (!existingClientByDomain) {
      const client = await prisma.client.create({
        data: {       
          domain: domain,
          
        }, 
      })
      return client;
    }

    // Check if user email exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    })
    if (existingUserByEmail) {
      return NextResponse.json({ user: null, message: "User with this email already exists. Please signin"})
    }
    const newUser = await prisma.user.create({
      data: {
        ...user,
        // client: { connect: { id: existingClientByDomain.id } },
        password: await bcrypt.hash(user.password, 10), 
      }
    });
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

  // export async function forgotPassword(email: string) {
//   const user = await prisma.user.findUnique({
//     where: {
//       email: email,
//     },
//   });

//   if (!user) throw new Error("The user does not exist");

//   const jwtUserId = signJwt({
//     id: user.id,
//   });
//   const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPass/${jwtUserId}`;
//   const body = compileResetPassTemplate(user.name, resetPassUrl);
//   const sendResult = await sendMail({
//     to: user.email,
//     subject: "Reset password",
//     body: body,
//   });
//   return sendResult;
// }

// type ResetPasswordFucn = (
//   jwtUserId: string,
//   password: string
// ) => Promise<"userNotExist" | "success">;

// export const resetPassword: ResetPasswordFucn = async (jwtUserId, password) => {
//   const payload = verifyJwt(jwtUserId);
//   if (!payload) return "userNotExist";
//   const userId = payload.id;
//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//   });
//   if (!user) return "userNotExist";

//   const result = await prisma.user.update({
//     where: {
//       id: userId,
//     },
//     data: {
//       password: await bcrypt.hash(password, 10),
//     },
//   });
//   if (result) return "success";
//   else throw new Error("Something went wrong!");
// };