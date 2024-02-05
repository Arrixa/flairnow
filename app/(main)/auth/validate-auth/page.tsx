// "use client"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


const ValidatingAuth = async () => {
  const session = await getServerSession(authOptions);
  // useSession().update
  // const { data: session } = useSession()
  const user = session?.user
  const role = session?.clientUser.role
  const client = session?.client
  console.log('session validate auth', session)

  if (!user) {
    redirect('/auth/signin')
  }
  if (user && !role || role == null || !session.clientUser || !session.client) {
    redirect('/profile')
  } 
  if (role && role.includes("EMPLOYEE")) {
    redirect('/dashboard/employee-profile')
  }
  
  return (
    <div>
      Validating authorisation
    </div>
  )
  }

export default ValidatingAuth;