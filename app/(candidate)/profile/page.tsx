import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!session || !session.user) redirect("/auth/signin");
  if (!session.role) {
    return (
      <div>
        {/* <Image
          height={300}
          width={300}
          src={user?.image ?? ""}
          alt={user?.name ?? ""}
          className="rounded-full"
        /> */}
        
        <div className="flex flex-col items-center gap-2">
          <p>Name:</p> <p className="">{user?.name}</p>
          <p>Email:</p> <p className="">{user?.email}</p>
        </div>
      </div>
    );
  }
  
};

export default ProfilePage;

// NOTE:
// Info from Google auth includes image: next/image not compatible