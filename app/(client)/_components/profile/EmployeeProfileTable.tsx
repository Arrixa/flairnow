import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import RoleBadges from "../../../components/common/RoleBadges";
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Session, User } from "next-auth";
import { SquareUserRound } from 'lucide-react';

interface UserProps {
  session?: Session | null, 
  user?: User | null, 
  onClick?: () => void;
}

const EmployeeProfileTable: React.FC<UserProps> = ({ session, formData }) => {
  const user = session?.user;
  console.log(formData, 'form data user data in employee profile table')
  const roles = session?.clientUser.role;

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <>
      <Table className="lg:w-2/3 md:w-10/12 w-full lg:space-x-10 mt-6 border-t">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableHead className="w-1/2">Profile image:</TableHead>
            <TableCell className="w-1/2 text-left pl-10">
            <Avatar>
              <AvatarImage src={formData.image} className='w-[60px] h-[60px] object-fill' />
              <AvatarFallback><SquareUserRound /></AvatarFallback>
            </Avatar>
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
              <RoleBadges roles={roles} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3">Company:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{`${user?.userDomain ? capitalizeFirstLetter(user?.userDomain) : ''}`}</TableCell>
          </TableRow>
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default EmployeeProfileTable
