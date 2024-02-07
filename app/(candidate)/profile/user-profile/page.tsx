import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { User } from "@prisma/client";

interface UserInfo {
  user: User;
}

const UserProfile = ({ user }: UserInfo) => {
  return (
    <>
      <Table className="lg:w-1/2 md:w-2/3 w-3/4 space-x-10">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
          </TableRow>
        </TableHeader>
        <TableBody>
        <TableRow>
            <TableHead className="w-1/3 px-10">First name:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{user?.firstName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3 px-10">Last name:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{user?.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3 px-10">Email:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{user?.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3 px-10">Photo:</TableHead>
            <TableCell className="w-2/3 text-left px-10">
            <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback>FN</AvatarFallback>
            </Avatar>
            </TableCell>
          </TableRow>
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default UserProfile