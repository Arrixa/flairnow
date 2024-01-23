import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  if(!session || !session.role || !session.role.includes('ADMIN' || 'OWNER')) {
    throw new Error("You do not have authorization to view the admin dashboard. You need to have the user role ADMIN or OWNER.")
  }
  return (
    <div>
      This is the admin dashboard
      {JSON.stringify(session)}
    </div>
  );
};

export default AdminPage;