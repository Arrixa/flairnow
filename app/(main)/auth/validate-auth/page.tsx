'use client'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Client, ClientUser } from "@prisma/client";

interface UserInfo {
  user: User;
  client?: Client | {};
  clientUser: ClientUser | {};
}

const ValidatingAuth = () => {
  const [userData, setUserData] = useState();
  const { data: session, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch user data from your API endpoint
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        setUserData(data);

        // Step 2: Trigger a session update
        const updatedSession = {
          ...session,
          user: { ...data.user },
          clientUser: { ...data.clientUser || {} },
          client: { ...data.client || {} },
        };
        console.log('Updated session:', updatedSession);

        await update(updatedSession);

        // Step 3: Fetch the updated session data
        const updatedSessionData = await fetch('/api/auth/session');
        const updatedSessionDataJson = await updatedSessionData.json();
        console.log('Updated session data:', updatedSessionDataJson);

        // Step 4: Perform routing logic based on the updated session data
        if (updatedSessionDataJson.clientUser.role && updatedSessionDataJson.clientUser.role.includes("EMPLOYEE")) {
          router.push('/dashboard/employee-profile');
        } else if (!updatedSessionDataJson.clientUser.role || updatedSessionDataJson.clientUser.role.length === 0) {
          router.push('/profile');
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/auth/signin');
      }
    };

    fetchData();
  }, [session]); // Added session to dependency array to re-run the effect when session changes

  return (
    <div>
      Validating authorization
    </div>
  );
};

export default ValidatingAuth;




        // Call the update function
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (!session) {
  //         router.push('/auth/signin');
  //         return;
  //       }

  //       // Fetch data from your API endpoint using an absolute URL
  //       const response = await fetch('/api/role');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data: UserInfo = await response.json();
  //       console.log(data, 'updated user info in validate-auth page');

  //       const { user, clientUser } = data;

  //       if (!user || !clientUser) {
  //         router.push('/auth/signin');
  //         return;
  //       }

  //       const role = clientUser.role;
  //       const client = data.client;

  //       if (!role || !client) {
  //         router.push('/profile');
  //         return;
  //       }

  //       if (role.includes("EMPLOYEE")) {
  //         router.push('/dashboard/employee-profile');
  //       }

  //       // Update the session with the fetched data
  //       const updatedSession = {
  //         ...session,
  //         user: { ...session.user, ...user },
  //         client: { ...session.client, ...client },
  //         clientUser: { ...session.clientUser, ...clientUser },
  //       };
  //       console.log(updatedSession, 'updated session in validate-auth page')

  //       // Call the update function
  //       await update(updatedSession);
  //     } catch (error) {
  //       console.error('Error fetching form data:', error);
  //       router.push('/auth/signin');
  //     }
  //   };

  //   fetchData();
  // }, [session, router, update]);

/*
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const ValidatingAuth = async () => {
  const session = await getServerSession(authOptions);

  const user = session?.user
  const client = session?.client
  const clientUser = session?.clientUser
  const role = clientUser?.role
  

  if (!session) {
    redirect('/auth/signin')
  }
    
  if (user && !role || role == null || !clientUser || !client) {
    redirect('/profile');
  } 
  if (role && role.includes("EMPLOYEE")) {
    redirect('/dashboard/employee-profile');
  }
  if (role && role.includes("ADMIN")) {
    redirect('/dashboard/admin');
  }

  
  return (
    <div>
      Validating authorisation
    </div>
  )
}

export default ValidatingAuth;

// Client-side function alternative

*/