import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { checkAccessAndRedirect } from "@/lib/redirects";

const getSessionData = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(authOptions);

  // Check access and redirect if needed
  await checkAccessAndRedirect('/employee-profile', session, res);

  return session;
};

const EmployeePage = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSessionData(req, res);
  const user = session?.user;
  const role = session?.clientUser.role;

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="p-4">Employee profile page</h2>
      <p>Name:</p> <p className="">{user?.name}</p>
      <p>Email:</p> <p className="">{user?.email}</p>
      <p>Role:</p> <p>{role}</p>
    </div>
  );
};

export default EmployeePage;