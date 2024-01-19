import prisma from "@/lib/prisma";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import * as bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  // adapter: PrismaAdapter(prisma),
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
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : "user",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        if (!user) throw new Error("User name or password is not correct");

        if (!credentials?.password) throw new Error("Please provide your password");
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) throw new Error("User name or password is not correct");

        if (!user.emailVerified) throw new Error("Please verify your email first!");

        const { password, ...userWithoutPass } = user;
        return userWithoutPass;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token = user as User;
      return token;
    },

    async session({ token, session }) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Callback that works to sign up new users via credentials and login with credentials and Google, but admin role does not work
// Also changed the JWT interface in types
/*
 callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },

    async session({ token, session }) {
      session.user.role = token.user.role;
      return session;
    },
  },
*/

// This broke everything:
// In prisma schema
// role          String @default("user")
// role needs its own schema enumerator - list of all possible roles

// Prisma adaptor error
/*
[next-auth][error][adapter_error_createUser] 
https://next-auth.js.org/errors#adapter_error_createuser 
Invalid `prisma.user.create()` invocation:

{
  data: {
    name: "FlairNow",
    email: "flairnow.arrixa@gmail.com",
    image: "https://lh3.googleusercontent.com/a/ACg8ocKbPYzkLJhsWmSaZg3IYksKUty58WmzP4kKJrAG1APx=s96-c",
    role: "user",
    emailVerified: null,
+   password: String
  }
}

Argument `password` is missing. {
  message: '\n' +
    'Invalid `prisma.user.create()` invocation:\n' +
    '\n' +
    '{\n' +
    '  data: {\n' +
    '    name: "FlairNow",\n' +
    '    email: "flairnow.arrixa@gmail.com",\n' +
    '    image: "https://lh3.googleusercontent.com/a/ACg8ocKbPYzkLJhsWmSaZg3IYksKUty58WmzP4kKJrAG1APx=s96-c",\n' +
    '    role: "user",\n' +
    '    emailVerified: null,\n' +
    '+   password: String\n' +
    '  }\n' +
    '}\n' +
    '\n' +
    'Argument `password` is missing.',
  stack: 'PrismaClientValidationError: \n' +
    'Invalid `prisma.user.create()` invocation:\n' +
    '\n' +
    '{\n' +
    '  data: {\n' +
    '    name: "FlairNow",\n' +
    '    email: "flairnow.arrixa@gmail.com",\n' +
    '    image: "https://lh3.googleusercontent.com/a/ACg8ocKbPYzkLJhsWmSaZg3IYksKUty58WmzP4kKJrAG1APx=s96-c",\n' +
    '    role: "user",\n' +
    '    emailVerified: null,\n' +
    '+   password: String\n' +
    '  }\n' +
    '}\n' +
    '\n' +
    'Argument `password` is missing.\n' +
    '    at ti (/home/tamlyn/Documents/Arrixa/flairnow/node_modules/.pnpm/@prisma+client@5.8.0_prisma@5.8.0/node_modules/@prisma/client/runtime/library.js:118:5888)\n' +
    '    at si.handleRequestError (/home/tamlyn/Documents/Arrixa/flairnow/node_modules/.pnpm/@prisma+client@5.8.0_prisma@5.8.0/node_modules/@prisma/client/runtime/library.js:125:6473)\n' +
    '    at si.handleAndLogRequestError (/home/tamlyn/Documents/Arrixa/flairnow/node_modules/.pnpm/@prisma+client@5.8.0_prisma@5.8.0/node_modules/@prisma/client/runtime/library.js:125:6151)\n' +
    '    at si.request (/home/tamlyn/Documents/Arrixa/flairnow/node_modules/.pnpm/@prisma+client@5.8.0_prisma@5.8.0/node_modules/@prisma/client/runtime/library.js:125:5859)\n' +
    '    at async l (/home/tamlyn/Documents/Arrixa/flairnow/node_modules/.pnpm/@prisma+client@5.8.0_prisma@5.8.0/node_modules/@prisma/client/runtime/library.js:130:9805)',
  name: 'PrismaClientValidationError'
}
{
  searchParams: {
    callbackUrl: 'http://localhost:3000/',
    error: 'OAuthCreateAccount'
  }
}
 ✓ Compiled in 432ms (1857 modules)
{
  searchParams: {
    callbackUrl: 'http://localhost:3000/',
    error: 'OAuthCreateAccount'
  }
}
*/