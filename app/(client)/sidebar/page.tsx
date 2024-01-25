// "use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SidebarComp from "../_components/Sidebar";

const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const userRoles = session?.clientUser?.role ?? [];

  return (
    <>
      <SidebarComp userRoles={userRoles} />     
    </>
  )
}

export default Sidebar;
