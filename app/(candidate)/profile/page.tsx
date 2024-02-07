import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import UserProfile from "../_components/UserProfile";
import UploadFile from "../../components/common/UploadFile";
import AddFile from "@/app/components/common/AddFile";


const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  // if (!session || !session.user || session.clientUser.role) redirect("/auth/validate-auth");
  // else {
    return (
      <main className='mx-10 lg:mx-20 w-3/4 lg:1/2 xl:1/2 flex flex-col items-center justify-center'>
        <h1 className="text-2xl text-left ml-10 font-semibold my-4 pt-8">User profile information</h1>
        <div className='w-min-fit flex flex-start'>
          <Tabs defaultValue="info" className="w-min-fit">
            <TabsList>
              <TabsTrigger value="info" className="info-trigger  ml-6">User information</TabsTrigger>
              <TabsTrigger value="uploads" className="info-trigger">Uploads</TabsTrigger>
              <TabsTrigger value="drop" className="info-trigger">Uploads</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <UserProfile user={user} />
            </TabsContent>
            <TabsContent value="uploads">
              <AddFile />
            </TabsContent>
            <TabsContent value="drop">
              <UploadFile />
            </TabsContent>
          </Tabs>
        </div>   
      </main>

    );
  }
// };

export default ProfilePage;

// NOTE:
// Info from Google auth includes image: next/image not compatible