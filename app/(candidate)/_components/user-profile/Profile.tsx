'use client'
import { Button } from '@/app/components/ui/button';
import UserProfile from './ProfileTable';
import { useState } from "react";
import { UserProps, FormData } from '@/lib/interfaces';
import ProfileForm from './ProfileForm';


const Profile: React.FC<UserProps> = ({ session }) => {
  const user = session?.user;
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    image: user?.image || '',
    id: user?.id || '',
  });

  return (
    <section className="flex flex-col w-full">
      {isEditMode ? (
        <div 
        className='flex flex-col mx-auto w-full'
        > 
        <ProfileForm formData={formData} setIsEditMode={setIsEditMode} setFormData={setFormData} session={session} />
        </div>
        ) : (
        <div className='w-full'>
          <div className="flex flex-row mx-auto w-full">
            {user && <UserProfile user={user} formData={formData} setIsEditMode={setIsEditMode}/>}
          </div>
        </div>
      )}
    </section>
  )
}

export default Profile
