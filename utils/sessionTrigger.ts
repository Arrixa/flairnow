import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";


export const triggerSessionUpdate = async () => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const client = session?.client;
    const clientUser = session?.clientUser;

    // Fetch the updated user and client information
    const dbUser = await prisma.user.findUnique({
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

    const updatedInfo = {
      user: { ...dbUser },
      client: { ...dbClient },
      clientUser: { ...dbClientUser },
    };

    // Trigger a session update by making a request to the dedicated endpoint
    const updateTriggerUrl = `${process.env.NEXTAUTH_URL}/api/auth/session`;
    // const updateTriggerUrl = `${process.env.NEXTAUTH_URL}/api/auth/update-session`;
    await fetch(updateTriggerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedInfo),
    });
    console.log('triggerSessionUpdate - updatedInfo:', updatedInfo);
  } catch (error) {
    console.error('Error triggering session update:', error);
  }
};
