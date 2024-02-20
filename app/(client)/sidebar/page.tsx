import SidebarComp from "../_components/sidebar/Sidebar";
import { SidebarProps } from "@/lib/interfaces";

const Sidebar: React.FC<SidebarProps> = async ({ session }) => {
  const userRoles = session?.role || [];
  console.log(session, userRoles, 'user roles & session in side bar page');

  return (
    <div className="">
      <SidebarComp userRoles={userRoles} session={session} />
    </div>
  );
};

export default Sidebar;
