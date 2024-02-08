// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';

// const ValidatingAuth = async () => {
//   const session = await getServerSession(authOptions);

//   const user = session?.user
//   const client = session?.client
//   const clientUser = session?.clientUser
//   const role = clientUser?.role
  

  
//   // if (!session) {
//   //   redirect('/auth/signin')
//   // }
//   // if (user && !role || role == null || !clientUser || !client) {
//   //   redirect('/profile');
//   // } 
//   // if (role && role.includes("EMPLOYEE")) {
//   //   redirect('/dashboard/employee-profile');
//   // }
//   // if (role && role.includes("ADMIN")) {
//   //   redirect('/dashboard/admin');
//   // }

//   if (role && role.includes("EMPLOYEE")) {
//     redirect('/dashboard/employee-profile');
//   } else if (!role || role.length === 0) {
//     redirect('/profile');
//   } else if (user && user.firstName) {
//     redirect('/');
//   } else {
//     redirect('/auth/signin')
//   }

  
//   return (
//     <div>
//       Validating authorisation
//     </div>
//   )
// }

// export default ValidatingAuth;



// Client-side function alternative
'use client'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/app/components/ui/skeleton';

interface UserInfo {
    domain: string | null;
    firstName: string;
    lastName: string;
    email: string;
    image: string | null; 
    role: string[] | [];
}

const ValidatingAuth = () => {
  const [userData, setUserData] = useState<UserInfo>();
  const { data: session, update } = useSession();
  const router = useRouter();
  console.log(session, 'session at top of comp')

  useEffect(() => {
    const fetchData = async () => {
        // Step 1: Fetch user data from your API endpoint
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        // setUserData(data);

        // if (session || data && data.role && data.role.includes("EMPLOYEE")) {
        //   router.push('/dashboard/employee-profile');
        // } else if (session || data || !data.role || data.role.length === 0) {
        //   router.push('/profile');
        // } else {
        //   router.push('/');
        // }

        // if (data && session) {
          const updatedSession = {
            ...session,
            firstName: session?.user?.firstName ?? data?.firstName,
            lastName: session?.user?.lastName ?? data?.lastName,
            email: session?.user?.email ?? data?.email,
            image: data?.image ?? '',
            role: data?.role ?? [],
          };
          await update(updatedSession);
          
          if (data && data.role) {
            router.push('/dashboard/employee-profile');
          } else if (session?.user?.firstName || data && !data.role) {
            router.push('/profile');
          } else {
            router.push('/');
          }
          console.log('Updated session:', updatedSession);
        // } else {
        //   router.push('/auth/signin');
        // }

          
      };
  
      fetchData();
    }, []);
          // Step 2: Trigger a session update
  

        // // Step 3: Fetch the updated session data
        // const updatedSessionData = await fetch('/api/auth/session');
        // const updatedSessionDataJson = await updatedSessionData.json();
        // console.log('Updated session data:', updatedSessionDataJson);

        // Step 4: Perform routing logic based on the updated session data

        // if (data && data.role && data.role.includes("EMPLOYEE")) {
        //   router.push('/dashboard/employee-profile');
        // } else if (!data || !data.role || data.role.length === 0) {
        //   router.push('/profile');
        // } else {
        //   router.push('/');
        // }
       



  return (
    <div className='h-screen flex flex-col items-center justify-center gap-5'>
      <h1 className="text-muted text-2xl">Validating the user authorisation</h1>
      <p></p>
      <Skeleton className="w-[100px] h-[20px] rounded-full" />

    </div>
  );
};

export default ValidatingAuth;


// Relying on fetched roles for role access

// 'use client'
// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { User, Client, ClientUser } from "@prisma/client";

// interface UserInfo {
//   user: User;
//   client?: Client | {};
//   clientUser: ClientUser | {};
// }

// const ValidatingAuth = () => {
//   const [userData, setUserData] = useState();
//   const { data: session, update } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Step 1: Fetch user data from your API endpoint
//         const response = await fetch('/api/user');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('Fetched data:', data);
//         setUserData(data);

//         // Step 2: Trigger a session update
//         const updatedSession = {
//           ...session,
//           user: { ...data.user },
//           clientUser: { ...data.clientUser || {} },
//           client: { ...data.client || {} },
//         };
//         console.log('Updated session:', updatedSession);

//         await update(updatedSession);

//         // Step 3: Fetch the updated session data
//         const updatedSessionData = await fetch('/api/auth/session');
//         const updatedSessionDataJson = await updatedSessionData.json();
//         console.log('Updated session data:', updatedSessionDataJson);

//         // Step 4: Perform routing logic based on the updated session data
//         if (updatedSessionDataJson.clientUser.role && updatedSessionDataJson.clientUser.role.includes("EMPLOYEE")) {
//           router.push('/dashboard/employee-profile');
//         } else if (!updatedSessionDataJson.clientUser.role || updatedSessionDataJson.clientUser.role.length === 0) {
//           router.push('/profile');
//         } else {
//           router.push('/');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         router.push('/auth/signin');
//       }
//     };

//     fetchData();
//   }, [session]); // Added session to dependency array to re-run the effect when session changes

//   return (
//     <div>
//       Validating authorization
//     </div>
//   );
// };

// export default ValidatingAuth;