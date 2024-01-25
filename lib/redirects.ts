"use server"

import { NextApiResponse } from 'next';
import { Session } from 'next-auth';

export const checkAccessAndRedirect = async (path: string, session: Session | null, res: NextApiResponse) => {
  console.log('path:', path);
  console.log('session:', session);
  console.log('res:', res);

  if (!session || !session.clientUser) {
    res.writeHead(302, { Location: '/' });
    res.end();
    return;
  }

  const { clientUser } = session;

  if (path === '/dashboard' && (!clientUser.role || !clientUser.role.includes('EMPLOYEE'))) {
    res.writeHead(302, { Location: '/' });
    res.end();
  } else if (path === '/employee-profile' && (!clientUser.role || !clientUser.role.includes('EMPLOYEE'))) {
    res.writeHead(302, { Location: '/' });
    res.end();
  } else if (path === '/dashboard/admin' && (!clientUser.role || !clientUser.role.includes('ADMIN'))) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
};