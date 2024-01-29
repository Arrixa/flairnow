import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { checkAccessAndRedirect } from "@/lib/redirects";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
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

  // Function to format role array
  function formatRoles(roles: string[]): string {
    if (!roles || roles.length === 0) {
      return '';
    }

    const formattedRoles = roles.map((role) => capitalizeFirstLetter(role)).join(', ');
    return formattedRoles;
  }



  // Function to capitalize the first letter of a string
  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className="flex flex-col items-center space-x-10">
      <h2 className="text-left py-10 font-semibold">Employee profile information</h2>
      <Table className="lg:w-1/2 md:w-2/3 w-3/4 mx-auto space-x-10">
        <TableCaption>Employee profile</TableCaption>
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
          <TableRow>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeePage;