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
        <ProfileForm formData={formData} setIsEditMode={setIsEditMode} setFormData={setFormData} session={session} />
        ) : (
          user && <UserProfile user={user} formData={formData} setIsEditMode={setIsEditMode}/>
      )}
    </section>
  )
}

export default Profile
