import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const EmployeePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const role = session?.clientUser.role
  if (!session || !session.user) redirect("/auth/signin");
  console.log(role, "role in employee profile")
  if (session.user && !role) redirect("/user-profile")
  if (role.includes('EMPLOYEE')) {
    return (
      <div className="flex flex-col items-center gap-2">
        <h2 className="p-4">Employee profile page</h2>
        <p>Name:</p> <p className="">{user?.name}</p>
        <p>Email:</p> <p className="">{user?.email}</p>
        <p>Role:</p> <p>{role}</p>
      </div>
    );
  } 
};

export default EmployeePage;