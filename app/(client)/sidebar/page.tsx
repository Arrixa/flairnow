// Can't consistently load the side bar without the user roles

'use client'
import { Session } from "next-auth";
import SidebarComp from "../_components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface UserProps {
  session?: Session | null, 
}

const Sidebar: React.FC<UserProps> = ({ session }) => {
  const { status, update } = useSession();
  const { data: sessionData } = useSession();
  const [userRoles, setUserRoles] = useState<string[] | null>(sessionData?.role || null);
  const [dataFetched, setDataFetched] = useState(false);
  console.log(userRoles);
  console.log(sessionData?.role, 'get sessionData in sidebar', session?.role, '< SERVER SESSION');

  // Fetch data from your API endpoint
  const fetchData = async () => {
    try {
      const response = await fetch('/api/role');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data, 'data client user from /api/role');
      setUserRoles(data.role);
      await update({
        ...session,
        ...(session?.clientUser && { clientUser: { ...session?.clientUser, role: data.role, clientId: data.clientId } }),
      });
      setDataFetched(true);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  useEffect(() => {
    // Fetch data only if userRoles aren't already set
    if (!userRoles || userRoles === null && status !== 'loading' && dataFetched === false) {
      fetchData();
    }
  }, [userRoles, status]);

  return (
    <div className="w-fit">
      <SidebarComp userRoles={userRoles || []} session={session} />
    </div>
  );
};

export default Sidebar;

