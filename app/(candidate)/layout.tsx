import NavBar from "@/app/components/nav/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);

    return (
      <div className="flex w-dvw">
        <main className="flex-grow">
          <NavBar />
          {children}
        </main>
      </div>
    )
  }
