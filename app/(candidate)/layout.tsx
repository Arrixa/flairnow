import NavBar from "@/app/components/nav/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);
  // if (!session || !session.user || session.clientUser.role) redirect("/auth/validate-auth");
  // else {
    return (
      <div className="flex">
        <main className="flex-grow">
          <NavBar />
          {children}
        </main>
      </div>
    )
  }
// }