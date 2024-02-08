import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SidebarComp from "../_components/sidebar/Sidebar";

const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  let userRoles
  if (session && session?.clientUser && session.clientUser !== null) {
    userRoles = session?.clientUser?.role;
  }

  return (
    <div className="w-fit">
      <SidebarComp userRoles={userRoles} session={session} />    
    </div>
  )
}

export default Sidebar;
