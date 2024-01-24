import { checkAccessAndRedirect } from '@/lib/redirects';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const clientDashboard = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(authOptions);
  console.log(session, 'session in client dashboard')

  // Check access and redirect if needed
  await checkAccessAndRedirect('/admin', session, res);
  return (
    <div>
      DASHBOARD
      <p>{session?.client?.domain}</p>
    </div>
  )
}

export default clientDashboard
