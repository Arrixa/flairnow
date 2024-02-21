import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import Profile from "../_components/user-profile/Profile";


const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
    return (
      <main className='px-10 lg:px-20 w-full flex flex-col items-center justify-center'>
        <h1 className="text-2xl text-left ml-10 font-semibold my-4 pt-8">User profile information</h1>
        <div className='w-full flex  items-center justify-center'>
          <Tabs defaultValue="info" className="">
            <TabsList>
              <TabsTrigger value="info" className="info-trigger  ml-6">User information</TabsTrigger>
              <TabsTrigger value="applications" className="info-trigger">Applications</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <Profile session={session} />
            </TabsContent>
            <TabsContent value="applications">
            </TabsContent>
          </Tabs>
        </div>   
      </main>
    );
  }

export default ProfilePage;
