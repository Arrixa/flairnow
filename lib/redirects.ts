import { NextApiResponse } from 'next';
import { Session } from 'next-auth';

export const checkAccessAndRedirect = async (path: string, session: Session | null, res: NextApiResponse) => {
  if (path === '/dashboard' && (!session || !session.clientUser || !session.clientUser.role.includes('EMPLOYEE'))) {
    res.writeHead(302, { Location: '/' });
    res.end();
  } else if (path === '/employee-profile' && (!session || !session.clientUser || !session.clientUser.role.includes('EMPLOYEE'))) {
    res.writeHead(302, { Location: '/' });
    res.end();
  } else if (path === '/dashboard/admin' && (!session || !session.clientUser || !session.clientUser.role.includes('ADMIN'))) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
};

