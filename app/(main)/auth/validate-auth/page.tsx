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
import { User, Client, ClientUser } from "@prisma/client";

interface UserInfo {
    domain: string | null;
    firstName: string;
    lastName: string;
    email: string;
    image: string | null; 
    role: string[] | [];
}

const ValidatingAuth = () => {
  const [userData, setUserData] = useState<UserInfo | undefined>(undefined);
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

        // const updatedSession = {
        //   // domain: data.client?.domain || '',
        //   firstName: data?.user.firstName || session?.user?.firstName,
        //   lastName: data?.user.lastName || session?.user?.lastName,
        //   email: data?.user.email || session?.user?.email ,
        //   image: data?.user.image || '',  
        //   role: data?.clientUser?.role || [],
        // };
        // console.log('Updated session:', updatedSession);
        // // Step 2: Trigger a session update

        // await update(updatedSession);

        // Step 3: Fetch the updated session data
        // const updatedSessionData = await fetch('/api/auth/session');
        // const updatedSessionDataJson = await updatedSessionData.json();
        // console.log('Updated session data:', updatedSessionDataJson);

        // Step 4: Perform routing logic based on the updated session data
        if (data && data.role && data.role.includes("EMPLOYEE")) {
          router.push('/dashboard/employee-profile');
        } else if (!data || !data.role || data.role.length === 0) {
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

  // if (userData) {
  //   if (userData && userData.role && userData.role.includes("EMPLOYEE")) {
  //     router.push('/dashboard/employee-profile');
  //   } else if (!userData.role || userData.role.length === 0) {
  //     router.push('/profile');
  //   } else {
  //     router.push('/');
  //   }
  // }

  return (
    <div>
      Validating authorization
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