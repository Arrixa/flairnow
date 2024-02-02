import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { checkAccessAndRedirect } from '@/lib/redirects';
import { getServerSession } from 'next-auth';
import React from 'react'
import { redirect } from 'next/navigation';

const ValidatingAuth = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.clientUser.role
  // await checkAccessAndRedirect('/');
  if (!session) {
    redirect('/auth/signin')
  }
  if (!role || role == null) {
    redirect('/profile')
  } else {

  }
  return (
    <div>
      Validating authorisation
    </div>
  )
}

export default ValidatingAuth
