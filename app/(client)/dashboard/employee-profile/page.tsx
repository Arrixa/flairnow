import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { checkAccessAndRedirect } from "@/lib/redirects";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import RoleBadges from "../../_components/RoleBadges";

const getSessionData = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(authOptions);

  // Check access and redirect if needed
  await checkAccessAndRedirect('/dashboard/employee-profile', session, res);

  return session;
};

const EmployeePage = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSessionData(req, res);
  const user = session?.user;
  const roles = session?.clientUser.role;
  const company = session?.client?.domain;

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <main className="flex flex-col items-left space-x-10 mx-20">
      <h1 className="text-2xl text-left mx-20 font-semibold my-8">Employee profile information</h1>
      <Table className="lg:w-1/2 md:w-2/3 w-3/4 space-x-10">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableHead className="w-1/3 px-10">Name:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{user?.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3 px-10">Email:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{user?.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3 px-10">Role:</TableHead>
            <TableCell className="w-2/3 text-left px-10 space-x-2">
              <RoleBadges roles={roles} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3 px-10">Company:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{`${company ? capitalizeFirstLetter(company) : ''}`}</TableCell>
          </TableRow>
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </main>
  );
};

export default EmployeePage;