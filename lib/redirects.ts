import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const checkAccessAndRedirect = async (path: string) => {
  const session: Session | null = await getServerSession(authOptions);

  // If there is no session, redirect to the home page
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const clientUser = session.clientUser

  // If the user does not have a role, redirect to /profile
  if (session && !session.clientUser || session.clientUser == null || session.client == null || !session.client) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  if (session && !clientUser) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  const role = clientUser.role;

  // If the user has role = EMPLOYEE
  if (role && role !== null && role?.includes('EMPLOYEE')) {
    return {
      redirect: {
        destination: '/dashboard/employee-profile',
        permanent: false,
      },
    };
  }

  // If the user has role = ADMIN
  if (role && role !== null && role?.includes('ADMIN')) {
    return {
      redirect: {
        destination: '/dashboard/admin',
        permanent: false,
      },
    };
  }

  if (path === '/dashboard' && (!clientUser.role || !clientUser.role.includes('EMPLOYEE'))) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else if (path === '/dashboard/employee-profile' && (!clientUser.role || !clientUser.role.includes('EMPLOYEE'))) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  } else if (path === '/dashboard/admin' && (!clientUser.role || !clientUser.role.includes('ADMIN'))) {
    return {
      redirect: {
        destination: '/dashboard/employee-profile',
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/profile',
      permanent: false,
    },
  };
};