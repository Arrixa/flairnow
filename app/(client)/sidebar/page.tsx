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
  const [clientUserData, setClientUserData] = useState([] as string[]);
  console.log(clientUserData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // if (session && status === "authenticated" && !sessionData.clientUser?.roles) {
        if (session && status !== "loading" && session.clientUser?.roles === undefined) {
          const userEmail = session.user?.email;
          if (!userEmail) {
            console.error('User ID is undefined');
            return;
          }
        // Fetch data from your API endpoint
          const response = await fetch('/api/user');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setClientUserData(data.role)
          console.log(data, 'data client user')
          // Update the session only if the fetched data is different
          if (JSON.stringify(clientUserData) !== JSON.stringify(data.role)) {
            await update({ ...session, ...session?.clientUser, role: data.role, clientId: data.clientId });
          }
        }
        
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    
    // Call fetchData when the component mounts
    fetchData();
  }, []);

  const userRoles = session?.clientUser?.roles || clientUserData;
  
  return (
    <div className="w-fit">
      <SidebarComp userRoles={userRoles} session={session} />    
    </div>
  )
}

export default Sidebar;
