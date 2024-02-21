import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import EmployeeProfile from "../../_components/profile/EmployeeProfile";


const EmployeePage = async () => {
  const session = await getServerSession(authOptions);
  
    return (
      <main className="flex flex-col items-left lg:space-x-10 w-full p-10">
        <h1 className="text-2xl text-left ml-4 lg:ml-24 font-semibold my-6 pt-8 ">Employee</h1>
        <EmployeeProfile session={session} />
      </main>
    );
};


export default EmployeePage;