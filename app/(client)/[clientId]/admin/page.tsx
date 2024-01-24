import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.clientUser.role
  if (!session || !session.user) redirect("/auth/signin");
  // if (!session.role)
  if (!role || !role.includes('ADMIN' || 'OWNER')) {
     throw new Error("You do not have authorization to view the admin dashboard. You need to have the user role ADMIN or OWNER.")
    // console.error("Not authorized, need to have the user role ADMIN or OWNER.", error);
    // toast.error("You do not have authorization to view the admin dashboard. You need to have the user role ADMIN or OWNER."); 
  } else {
    return (
      <div>
        <h2>Admin dashboard</h2>
        {JSON.stringify(session)}
      </div>
    );
  }
};

export default AdminPage;