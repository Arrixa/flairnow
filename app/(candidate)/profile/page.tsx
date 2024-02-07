import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import UserProfile from "../_components/user-profile/ProfileTable";
import UploadFile from "../../components/common/UploadFile";
import AddFile from "@/app/components/common/AddFile";
import ProfileForm from "../_components/user-profile/ProfileForm";


const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
    return (
      <main className='mx-10 lg:mx-20 w-3/4 lg:1/2 xl:1/2 flex flex-col items-center justify-center'>
        <h1 className="text-2xl text-left ml-10 font-semibold my-4 pt-8">User profile information</h1>
        <div className='w-min-fit flex flex-start'>
          <Tabs defaultValue="info" className="w-min-fit">
            <TabsList>
              <TabsTrigger value="info" className="info-trigger  ml-6">User information</TabsTrigger>
              <TabsTrigger value="applications" className="info-trigger">Applications</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <ProfileForm session={session} user={user} />
            </TabsContent>
            <TabsContent value="applications">
            </TabsContent>
          </Tabs>
        </div>   
      </main>

    );
  }

export default ProfilePage;

{/* <UploadFile /> */}