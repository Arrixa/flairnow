import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";


const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  // if (!session || !session.user || session.clientUser.role) redirect("/auth/validate-auth");
  // else {
    return (
      <main className="flex flex-col items-left space-x-10 mx-20">
        <h1 className="text-2xl text-left mx-20 font-semibold my-8">User profile information</h1>
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
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </main>
    );
  }
// };

export default ProfilePage;

// NOTE:
// Info from Google auth includes image: next/image not compatible