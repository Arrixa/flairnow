import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { CldImage } from 'next-cloudinary';
import { BookText, Building, Paperclip } from "lucide-react";
import AddLogo from "./AddLogo";
import { ClientForm } from "@/lib/interfaces"
import { useState, useEffect } from "react";

const CompanyInfo: React.FC<ClientForm & { formData?: ClientForm }> = ({ formData }) => {

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
  };

  const logo = client?.logo;
  const cloudinaryLogoDomain = client?.domain;
  const defaultLogo = 'https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/DefaultLogo.png';
  const logoCloudUrl = `https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/${cloudinaryLogoDomain}.png`;
  const [logoUrl, setLogoUrl] = useState<string>(defaultLogo);


  useEffect(() => {
    if (logo && logo !== null) {
      setLogoUrl(logoCloudUrl);
    } else {
      setLogoUrl(defaultLogo);
    }
  }, [logo, logoCloudUrl]);

  useEffect(() => {
    console.log("Logo URL updated:", logoUrl);
  }, [logoUrl]);

  return (
    <section className="flex flex-col w-full">  
      <div className="w-full">
        <div className="flex items-center mt-4">
          <Paperclip />
          <h2 className="text-xl font-semibold ml-4">Company assets</h2>
        </div>
        <Table className="w-full space-x-10">
        <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
            </TableRow>
          </TableHeader>
          <TableRow>
            <TableHead className="w-1/3 pl-10 pt-5 align-bottom pb-3">Company logo:</TableHead>
            <TableCell className="lg:w-1/2 w-full text-left px-12 flex justify-between items-center">
              <div className="w-full flex flex-row items-center align-bottom">
                <div className=''>
                  <CldImage alt={`${client?.domain} logo`} src={logoUrl} width={80} height={80} className='object-cover' />
                </div>
                <div className='mb-8 align-top'>
                  <AddLogo setLogoUrl={setLogoUrl} />
                </div>
              </div>
            </TableCell>
          </TableRow>
        </Table>         
        </div>
      <div className="w-full">
        <div className="flex items-center my-4">
          <BookText />
          <h2 className="text-xl font-semibold ml-4">General Information</h2>
        </div>
        <Table className="w-full">
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
            </TableRow>
          </TableHeader>
          <TableBody >
            <TableRow className="my-2">
              <TableHead className="w-1/3 pl-10 pt-5">Name:</TableHead>
              <TableCell className="w-2/3 text-left pl-10 pt-5">{client?.companyName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10 pt-5">Website:</TableHead>
              <TableCell className="w-2/3 text-left pl-10 pt-5">{client?.website}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10 pt-5">Description:</TableHead>
              <TableCell className="w-2/3 text-left pl-10 pt-5">{client?.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10 pt-5">Phone number:</TableHead>
              <TableCell className="w-2/3 text-left pl-10 space-x-2 pt-5">{formatPhoneNumber(client?.countryCode, client?.phoneNumber)}</TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableBody>
        </Table>       
      </div>
      <div className="">
        <div className="flex items-center my-8">
          <Building />
          <h2 className="text-xl font-semibold ml-4">Location</h2>
        </div>
        <Table className="w-full space-x-1">
          <TableBody>
            <TableRow>
              <TableHead className="w-1/3 pl-10 pt-5">Street number:</TableHead>
              <TableCell className="w-2/3 text-left pl-10 pt-5">{client?.streetNo}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10 pt-5">Street address:</TableHead>
              <TableCell className="w-2/3 text-left pl-10 pt-5">{client?.streetAddress}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10 pt-5">Province:</TableHead>
              <TableCell className="w-2/3 text-left pl-10 pt-5">{client?.province}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10 pt-5">Zip code:</TableHead>
              <TableCell className="w-2/3 text-left pl-10 space-x-2 pt-5">{client?.zipCode}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 pl-10 pt-5">Country:</TableHead>
              <TableCell className="w-2/3 text-left pl-10 space-x-2 pt-5">{client?.country}</TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default CompanyInfo
