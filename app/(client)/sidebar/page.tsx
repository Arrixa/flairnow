import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SidebarComp from "../_components/sidebar/Sidebar";
import UserCard from "../_components/sidebar/UserCard";

const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  let userRoles
  if (session && session?.clientUser && session.clientUser !== null) {
    userRoles = session?.clientUser?.role;
  }

  return (
    <div className="flex flex-col h-auto w-auto">
      <SidebarComp userRoles={userRoles} /> 
      <UserCard session={session} />    
    </div>
  )
}

export default Sidebar;
