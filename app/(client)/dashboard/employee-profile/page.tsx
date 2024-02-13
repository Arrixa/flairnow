import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import EmployeeProfileForm from "../../_components/profile/EmployeeProfileForm";


const EmployeePage = async () => {
  const session = await getServerSession(authOptions);

    const user = session?.user;
    const roles = session?.clientUser.role;
    console.log(session, user, roles, 'user and roles in employee page')
  
    return (
      <main className="flex flex-col items-left space-x-10 mx-10 w-full">
        <h1 className="text-2xl text-left mx-20 font-semibold my-6 pt-8">Employee profile information</h1>
        <EmployeeProfileForm session={session} />
      </main>
    );
};


export default EmployeePage;