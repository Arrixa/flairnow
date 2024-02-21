import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { CldImage } from 'next-cloudinary';
import { BookText, Building, Paperclip } from "lucide-react";
import AddLogo from "./AddLogo";
import { ClientForm } from "@/lib/interfaces"
import { useState, useEffect } from "react";
import { capitaliseFirstLetter } from '@/lib/capitiliseFirstLetter';
import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"

const CompanyInfo: React.FC<ClientForm & { formData?: ClientForm, setIsEditMode: React.Dispatch<React.SetStateAction<boolean>> }> = ({ formData, setIsEditMode }) => {

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
      <Card className='m-2 p-2'>
        <CardContent>
          <div className="w-full flex flex-row items-center align-bottom">
            <div className=''>
              <CldImage alt={`${client?.domain} logo`} src={logoUrl} width={80} height={80} className='object-cover' />
            </div>
            <div className='mb-8 align-top'>
              <AddLogo setLogoUrl={setLogoUrl} />
            </div>
          </div>
        </CardContent>
        <div className='flex flex-row justify-between'>
          <CardHeader>
            <CardTitle>{`Welcome ${capitaliseFirstLetter(client?.domain ? client?.domain : "")}`}</CardTitle>
            <CardDescription>{client?.companyName ? client?.companyName : ""}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className='w-fit mt-2 text-md'
              onClick={() => setIsEditMode(true)}
            >
              Edit information
            </Button>
          </CardFooter>
        </div>
      </Card> 
      <Card className='m-2 p-2'>
        <CardHeader>
        {/* <BookText /> */}
          <CardTitle> General Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Company name:</p>
          <p>{client?.companyName}</p>
        </CardContent>
        <CardContent>
          <p>Website:</p>
          <p>{client?.website}</p>
        </CardContent>
        <CardContent>
          <p>Description:</p>
          <p>{client?.description}</p>
        </CardContent>
        <CardContent>
          <p>Phone number:</p>
          <p>{formatPhoneNumber(client?.countryCode, client?.phoneNumber)}</p>
        </CardContent>
      </Card> 
      <Card className='m-2 p-2'>
        <CardHeader>
        {/* <Building /> */}
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Street number:</p>
          <p>{client?.streetNo}</p>
        </CardContent>
        <CardContent>
          <p>Street address:</p>
          <p>{client?.streetAddress}</p>
        </CardContent>
        <CardContent>
          <p>Province:</p>
          <p>{client?.province}</p>
        </CardContent>
        <CardContent>
          <p>Zip code:</p>
          <p>{client?.zipCode}</p>
        </CardContent>
        <CardContent>
          <p>Country:</p>
          <p>{client?.country}</p>
        </CardContent>
      </Card> 
    </section>
  )
}

export default CompanyInfo;
