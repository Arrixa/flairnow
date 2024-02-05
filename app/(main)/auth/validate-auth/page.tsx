import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


const ValidatingAuth = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user
  const role = session?.clientUser.role
  const client = session?.client
  console.log('client length', Object.entries(client).length)
  console.log('clientuser cient id', session?.clientUser.clientId)
  if (!session) {
    redirect('/auth/signin')
  }
  if (!role || role == null || !session.clientUser || !session.client) {
    redirect('/profile')
  } else {
    redirect('/dashboard/employee-profile')
  }
  return (
    <div>
      Validating authorisation
    </div>
  )
}

export default ValidatingAuth;