import { checkAccessAndRedirect } from '@/lib/redirects';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SidebarComp from '../_components/Sidebar';

// const clientDashboard = async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getServerSession(authOptions);
//   console.log(session, 'session in client dashboard')

//   // Check access and redirect if needed
//   await checkAccessAndRedirect('/admin', session, res);

const clientDashboard = () => {
  return (
    <div>
      
    </div>
  )
}

export default clientDashboard
