import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import RoleBadges from "../../../components/common/RoleBadges";
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import AddPhoto from '@/app/components/common/AddPhoto';
import { FormData } from '@/lib/interfaces';
import { useSession } from 'next-auth/react';

const EmployeeProfileTable: React.FC<{ formData: FormData }> = ({ formData }) => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(formData, 'form data user data in employee profile table')
  const roles = session?.clientUser.role;

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

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
            <TableHead className="w-1/3 pt-2">Profile image:</TableHead>
            <TableCell className="lg:w-1/2 w-full text-left px-12 flex justify-between items-end align-center">
              {formData.image ? (
                <CldImage alt='profile image' src={formData.image} width={50} height={50} className='rounded-full' />
              ) : (
                <Image alt='profile image' src='/default/Avatar.png' width={50} height={50} className='rounded-full' />
                )}
              <div className='mt-6 text-md w-1/3 ml-2'>
                <AddPhoto  />
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
