import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiBuildingOffice, HiNewspaper } from "react-icons/hi2";
import { CldImage } from 'next-cloudinary';

interface ClientData {
  domain?: string;
  companyName?: string;
  website?: string;
  description?: string;
  countryCode?: string;
  phoneNumber?: string;
  streetNo?: string;
  streetAddress?: string;
  province?: string;
  zipCode?: string;
  country?: string;
}

const CompanyInfo: React.FC<ClientData & { formData?: ClientData }> = ({ formData }) => {

  const client = formData
  console.log(client, 'client data in client info')

  function formatPhoneNumber(countryCode: string | undefined, phoneNumber: string | undefined): string | undefined {
    if (countryCode && phoneNumber) {
      const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
      if (!cleanedPhoneNumber) {
        return undefined; 
      }
      const formattedPhoneNumber = `+${countryCode} ${cleanedPhoneNumber.replace(/^0+/, '').replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4')}`;
  
      return formattedPhoneNumber;
    } else {
      return undefined; 
    }
  }

  

  return (
    <section className="flex flex-col w-full">    
      <div className="w-full">
      {/* <CldImage
        width={100}
        height={100}
        src={client?.domain} 
        alt='Client logo' 
      /> */}
        <div className="flex items-center my-4">
          <HiNewspaper />
          <h2 className="text-xl font-semibold ml-6">General Information</h2>
        </div>
        <Table className="w-full">
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableHead className="w-1/3 pl-10">Name:</TableHead>
              <TableCell className="w-2/3 text-left pl-10">{client?.companyName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10">Website:</TableHead>
              <TableCell className="w-2/3 text-left pl-10">{client?.website}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10">Description:</TableHead>
              <TableCell className="w-2/3 text-left pl-10">{client?.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10">Phone number:</TableHead>
              <TableCell className="w-2/3 text-left pl-10 space-x-2">{formatPhoneNumber(client?.countryCode, client?.phoneNumber)}</TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableBody>
        </Table>       
      </div>
      <div className="">
        <div className="flex items-center my-8">
          <HiBuildingOffice />
          <h2 className="text-xl font-semibold ml-6">Location</h2>
        </div>
        <Table className="w-full space-x-1">
        <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableHead className="w-1/3 pl-10">Street number:</TableHead>
              <TableCell className="w-2/3 text-left pl-10">{client?.streetNo}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10">Street address:</TableHead>
              <TableCell className="w-2/3 text-left pl-10">{client?.streetAddress}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10">Province:</TableHead>
              <TableCell className="w-2/3 text-left pl-10">{client?.province}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10">Zip code:</TableHead>
              <TableCell className="w-2/3 text-left pl-10 space-x-2">{client?.zipCode}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10">Country:</TableHead>
              <TableCell className="w-2/3 text-left pl-10 space-x-2">{client?.country}</TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default CompanyInfo
