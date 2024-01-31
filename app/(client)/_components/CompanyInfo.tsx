import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Session } from "next-auth";
import { HiBuildingOffice, HiNewspaper } from "react-icons/hi2";
// import { FormDataType } from "./AdminDashboardForm";

interface AdminProps {
  session?: Session | null, 
  onClick?: () => void;
}

const CompanyInfo: React.FC<AdminProps> = ({ session, formData }) => {
  // const client = session?.client;
  const client = formData
  console.log('Client object:', client);
  return (
    <section className="flex flex-col w-full">    
      <div className="">
        <div className="flex items-center my-8">
          <HiNewspaper />
          <h2 className="text-xl font-semibold ml-6">General Information</h2>
        </div>
        <Table className="lg:w-2/3 md:w-2/3 w-3/4 space-x-10">
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableHead className="w-1/3 px-10">Name:</TableHead>
              <TableCell className="w-2/3 text-left px-10">{client?.companyName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 px-10">Website:</TableHead>
              <TableCell className="w-2/3 text-left px-10">{client?.website}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 px-10">Description:</TableHead>
              <TableCell className="w-2/3 text-left px-10">{client?.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 px-10">Country code:</TableHead>
              <TableCell className="w-2/3 text-left px-10 space-x-2">{client?.countryCode}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 px-10">Phone number:</TableHead>
              <TableCell className="w-2/3 text-left px-10 space-x-2">{client?.phoneNumber}</TableCell>
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
        <Table className="lg:w-2/3 md:w-2/3 w-3/4 space-x-10">
        <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableHead className="w-1/3 px-10">Street number:</TableHead>
              <TableCell className="w-2/3 text-left px-10">{client?.streetNo}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 px-10">Street address:</TableHead>
              <TableCell className="w-2/3 text-left px-10">{client?.streetAddress}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 px-10">Province:</TableHead>
              <TableCell className="w-2/3 text-left px-10">{client?.province}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 px-10">Zip code:</TableHead>
              <TableCell className="w-2/3 text-left px-10 space-x-2">{client?.zipCode}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 px-10">Country:</TableHead>
              <TableCell className="w-2/3 text-left px-10 space-x-2">{client?.country}</TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default CompanyInfo
