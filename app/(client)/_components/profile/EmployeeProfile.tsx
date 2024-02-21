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

  return (
    <section className="flex flex-col lg:w-2/3 md:w-10/12 w-full lg:space-x-10 ">
      {isEditMode ? (
        <div 
        className='flex flex-col mx-auto w-full'
        >
          <EmployeeProfileForm formData={formData} setIsEditMode={setIsEditMode} setFormData={setFormData} session={session} />
        </div>
      ) : (
        <div className='w-full'>
          <div className="flex flex-row mx-auto w-full">
            <EmployeeProfileTable formData={formData} setIsEditMode={setIsEditMode} />
          </div>
          <div className="w-10/12 lg:space-x-10 flex flex-row">
            <div className="w-full lg:mx-24 md-mx-10">
            </div>            
          </div>
        </div>     
      )}
    </section>
  )
}

export default EmployeeProfile;
