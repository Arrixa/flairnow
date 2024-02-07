// "use client"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { User, Client, ClientUser } from "@prisma/client";

interface UserInfo {
  user: User;
  client?: Client | {};
  clientUser: ClientUser | {};
}


const ValidatingAuth = async () => {
  const session = await getServerSession(authOptions);
  // useSession().update
  // const { data: session } = useSession()
  const user = session?.user
 

  const fetchData = async () => {
    try {
      // Fetch data from your API endpoint
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/role`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();  
      console.log(data, 'updated user info in validate-auth page');
      return data

    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  // fetchData();

  if (!session) {
    redirect('/auth/signin')
  }

  let updatedUserData: UserInfo | null = await fetchData();

  if (updatedUserData && updatedUserData !== null) {
    const role = updatedUserData.clientUser.role;
    const client = updatedUserData.client;
    const clientUser = updatedUserData.clientUser;

    if (user && !role || role == null || !clientUser || !client) {
      redirect('/profile');
    } 
    if (role && role.includes("EMPLOYEE")) {
      redirect('/dashboard/employee-profile');
    }
  } else {
    redirect('/auth/signin');
  }

  
  return (
    <div>
      Validating authorisation
    </div>
  )
  }

export default ValidatingAuth;