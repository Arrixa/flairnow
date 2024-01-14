import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session)
  const user = session?.user;
  // if (!session || !session.user) redirect("/auth/signin");
  
  return (
    <div>
      <Image
        height={300}
        width={300}
        src={user?.image ?? ""}
        alt={user?.fullname ?? ""}
        className="rounded-full"
      />
      <div className="flex flex-col items-center gap-2">
        <p>Full Name:</p> <p className="">{user?.fullname}</p>
        <p>Email:</p> <p className="">{user?.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;