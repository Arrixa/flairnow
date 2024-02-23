'use client'
import { useEffect, useState } from "react";
import EmployeeProfileTable from './EmployeeProfileTable';
import EmployeeProfileForm from './EmployeeProfileForm';
import { FormData } from '@/lib/interfaces';
import { UserRoundCheck } from 'lucide-react';
import { Session } from "next-auth";

const EmployeeProfile = ({ session }: { session: Session | null }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<FormData>(() => ({
    firstName: session?.user?.firstName,
    lastName: session?.user?.lastName,
    email: session?.user?.email,
    image: session?.user?.image,
    id: session?.user.id,
  }));

  // FTN-2 / FTM-20 8. Render form : table

  return (
    <section className="flex flex-col w-full">
      {isEditMode ? (
        <div 
        className='flex flex-col mx-auto w-full'
        >
          <EmployeeProfileForm formData={formData} setIsEditMode={setIsEditMode} setFormData={setFormData} session={session} />
        </div>
      ) : (
        <div className="flex flex-row mx-auto w-full">
          <EmployeeProfileTable formData={formData} setIsEditMode={setIsEditMode} />
        </div>
      )}
    </section>
  )
}

export default EmployeeProfile;
