import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import RoleBadges from "../../../components/common/RoleBadges";
import { CldImage } from 'next-cloudinary';
import AddPhoto from '@/app/components/common/AddPhoto';
import { FormData } from '@/lib/interfaces';
import { useSession } from 'next-auth/react';

const EmployeeProfileTable: React.FC<{ formData: FormData }> = ({ formData }) => {
  const { data: session } = useSession();
  const user = session?.user;
  // console.log(formData, 'form data user data in employee profile table')
  const roles = session?.clientUser.role;

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const cloudinaryBaseURL = 'https://res.cloudinary.com/dsbvy1t2i/image/upload/';
  const cloudinaryImageId = session?.user.id; 
  const imageUrl = `${cloudinaryBaseURL}v1707912829/${cloudinaryImageId}.png`;
  const defaultImg = '/default/Avatar.png';

  return (
    <div className='flex flex-col mx-auto w-full'>
      <Table 
      // className="lg:w-2/3 md:w-10/12 w-full lg:space-x-10 mt-6 border-t"
      className='w-full'
      >
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
          <TableHead className="w-1/2">Profile image</TableHead>
            <TableCell className="w-1/2 text-left pl-10">
              <div className="w-full flex flex-row items-center justify-between align-middle">
                <div className=''>
                  <CldImage alt='profile image' src={imageUrl ? imageUrl : defaultImg} width={100} height={100} className='rounded-full' />
                </div>
                <div className='w-3/4 mt-6 text-md ml-4'>
                  <AddPhoto  />
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3">First name:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{formData?.firstName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3">Last name:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{formData?.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3">Email:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{formData?.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3">Role:</TableHead>
            <TableCell className="w-2/3 text-left px-10 space-x-2">
              <RoleBadges roles={roles} role={''} index={0} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3">Company:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{`${user?.userDomain ? capitalizeFirstLetter(user?.userDomain) : ''}`}</TableCell>
          </TableRow>
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default EmployeeProfileTable
