import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import AddPhoto from '@/app/components/common/AddPhoto';
import { UserInfo } from '@/lib/interfaces';

const UserProfile = ({ user }: UserInfo) => {
  return (
    <>
      <Table className="w-full space-x-10">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
          <TableHead className="w-1/3">Profile image:</TableHead>
            <TableCell className="lg:w-1/2 w-full text-left px-12 flex justify-between items-center align-bottom">
            {user.image ? (
              <div className='ml-2'>
                <CldImage alt='profile image' src={user.image} width={50} height={50} className='rounded-full' />
              </div>
              ) : (
                <div className='ml-2'>
                <Image alt='profile image' src='/default/Avatar.png' width={50} height={50}  className='rounded-full'/>
              </div>
              )}
              <div className='mt-6 text-md w-1/3'>
                <AddPhoto  />
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/2 pl-10">First name:</TableHead>
            <TableCell className="w-1/2 text-left pl-10">{user?.firstName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/2 pl-10">Last name:</TableHead>
            <TableCell className="w-1/2 text-left pl-10">{user?.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/2 pl-10">Email:</TableHead>
            <TableCell className="w-1/2 text-left pl-10">{user?.email}</TableCell>
          </TableRow>
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default UserProfile
