import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import NextAuth from "next-auth/next";
import { sendVerificationRequest } from "@/utils/sendVerificationRequest";
import { JWT } from "next-auth/jwt";


export const authOptions: NextAuthOptions = {
  
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest({ identifier, url, provider }) {
        sendVerificationRequest({ identifier, url, provider })
      },
    }),

  ],
  callbacks: {
    async jwt({ token, user, trigger, session }): Promise<JWT> {

      if(trigger === 'update'){
        return {...token, ...session}
      }


      if (token && user && token.email) {
        console.log('Token email:', token.email);
  
        const dbUser = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });
  
        const emailDomain = user?.email?.toLowerCase().split('@').pop()?.split('.')[0]
        console.log(emailDomain)
        const dbClient = await prisma.client.findFirst({
          where: {
            domain: emailDomain
          }
        })

        const dbClientUser = await prisma.clientUser.findFirst({
          where: {
            userId: user.id
          }
        })

        if (dbUser || dbClientUser || dbClient) {
          return {
            user: {
              id: dbUser.id,
              username: dbUser.username,
              email: dbUser.email,
            },
            id: dbUser.id,
            username: dbUser.username,
            email: dbUser.email,
            role: dbClientUser?.role,
            clientId: dbClientUser?.clientId,
            client: {
              domain: dbClient?.domain,
              id: dbClient?.id,
              companyName: dbClient?.companyName,
              website: dbClient?.website,
              description: dbClient?.description,
              countryCode: dbClient?.countryCode,
              phoneNumber: dbClient?.phoneNumber,
              streetNo: dbClient?.streetNo,
              streetAddress: dbClient?.streetAddress,
              province: dbClient?.province,
              zipCode: dbClient?.zipCode,
              country: dbClient?.country
            }
          }
        }
      }
      console.log(token)
      return token;
    },

    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
          email: token.email
        };

        session.clientUser = {
          role: token.role, 
          clientId: token.clientId, 
        };

        session.client = {
          domain: token.client?.domain,
          id: token.client?.id,
          name: token.client?.name,
          website: token.client?.website,
          description: token.client?.description,
          countryCode: token.client?.countryCode,
          phoneNumber: token.client?.phoneNumber,
          streetNo: token.client?.streetNo,
          streetAddress: token.client?.streetAddress,
          province: token.client?.province,
          zipCode: token.client?.zipCode,
          country: token.client?.country
        }
      }
      return session;
    },
  },
  events: {
    signIn: ({ user, account, profile, isNewUser }) => {
      console.log(`isNewUser: ${JSON.stringify(isNewUser)}`);
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: '/auth/signup',
    // error: '/auth/error', 
    verifyRequest: "/auth/verify"
  },
  theme: {
    colorScheme: "auto",
  },
  // debug: true
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
