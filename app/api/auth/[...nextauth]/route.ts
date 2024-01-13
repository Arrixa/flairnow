import { db } from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
  // pages: {
  //   signIn: "/login",
  // },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      idToken: true,

      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Your email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) throw new Error("User name or password is not correct");

        if (!credentials?.password) throw new Error("Please Provide Your Password");
        const isPassowrdCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPassowrdCorrect) throw new Error("User name or password is not correct");

        // if (!user.emailVerified) throw new Error("Please verify your email first!");

        const { password, ...userWithoutPass } = user;
        return userWithoutPass;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },

    async jwt({ token, user }) {
      console.log(token, user);
      if (user) {
        return {
          ...token,
          username: user.username
        }
      }  
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username
        }
      }
    },
  }

  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) token.user = user as User;
  //     return token;
  //   },

  //   async session({ token, session }) {
  //     session.user = token.user;
  //     return session;
  //   },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };