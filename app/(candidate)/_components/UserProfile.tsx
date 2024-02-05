import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";

const UserProfile = ({ user }) => {
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
            <TableHead className="w-1/3 px-10">Name:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{user?.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/3 px-10">Email:</TableHead>
            <TableCell className="w-2/3 text-left px-10">{user?.email}</TableCell>
          </TableRow>
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default UserProfile
