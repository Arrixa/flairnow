import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import EmployeeProfileForm from "../../_components/profile/EmployeeProfileForm";


const EmployeePage = async () => {
  const session = await getServerSession(authOptions);
  
    return (
      <main className="flex flex-col items-left space-x-10 mx-10 w-full">
        <h1 className="text-2xl text-left ml-24 font-semibold my-6 pt-8 ">Employee</h1>
        <EmployeeProfileForm session={session} />
      </main>
    );
};


export default EmployeePage;