import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SidebarComp from "../_components/sidebar/Sidebar";
import UserCard from "../_components/sidebar/UserCard";

const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const userRoles = session?.clientUser?.role ?? [];

  return (
    <div className="flex flex-col">
      <SidebarComp userRoles={userRoles} /> 
      <UserCard session={session} />    
    </div>
  )
}

export default Sidebar;
