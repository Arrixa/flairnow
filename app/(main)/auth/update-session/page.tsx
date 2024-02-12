'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface UpdatedUserInfo {
  userDomain: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  role: string[];
}

export default function UpdateSession() {
  const { data: session, update } = useSession();
  // const router = useRouter();

  useEffect(() => {
    const fetchUpdatedUserInfo = async (): Promise<UpdatedUserInfo> => {
      const apiUrl = '/api/user';
      console.log('Fetching data from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        console.error('Error fetching data. Status:', response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);
      return data;
      
    };
    
    const updateSession = async () => {
    try {
      const updatedUserInfo = await fetchUpdatedUserInfo();
    
      await update({
        ...session,
        userDomain: updatedUserInfo.userDomain,
        firstName: updatedUserInfo.firstName,
        lastName: updatedUserInfo.lastName,
        email: updatedUserInfo.email,
        role: updatedUserInfo?.role || [],
      });
    console.log('updated session??')
    // router.push('/auth/validate-auth');
      
    } catch (error) {
      console.error(error);
    }
  };
  updateSession();
  }, [session, update])
  
  return null;
}