'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { HiBuildingOffice, HiNewspaper, HiUserCircle } from 'react-icons/hi2';
import { Textarea } from '@/app/components/ui/textarea';
import { toast } from 'react-toastify';
import CompanyInfo from './CompanyInfo';
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { CountrySelect } from '@/app/components/common/CountrySelect';
import { CodeSelect } from '@/app/components/common/CodeSelect';
import { Label } from '@/app/components/ui/label';
import AddLogo from './AddLogo';
import { useSession } from 'next-auth/react';
import { CldImage } from 'next-cloudinary';
import { Skeleton } from '@/app/components/ui/skeleton';


interface AdminProps {
  session?: Session | null, 
  onClick?: () => void;
}

const FormSchema = z.object({
  companyName: z.string().min(1, 'Name is required'),
  website: z.string().url('Invalid URL'),
  description: z.string(),
  countryCode: z.string().min(1, 'Country code is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  streetNo: z.string(),
  streetAddress: z.string(),
  province: z.string(),
  zipCode: z.string(),
  country: z.string(),
  // domain: z.string(),
});


const AdminDashboardForm: React.FC<AdminProps> = ({ session }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: '',
      website: '',
      description: '',
      countryCode: '',
      phoneNumber: '',
      streetNo: '',
      streetAddress: '',
      province: '',
      zipCode: '',
      country: '',
      // domain: '',
    },
  });

  const [selectedCode, setSelectedCode] = useState<string>(''); 
  const [selectedCountry, setSelectedCountry] = useState<string>(''); 
  const [isEditMode, setIsEditMode] = useState(true);
  const [formData, setFormData] = useState({});
  const { update } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await fetch('/api/client');
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
  
        const data = await response.json();
        
        // Set form data with fetched values
        setFormData(data)
        console.log(data, 'Set form data with fetched values');
  
        const mappedData = {
          domain: session?.user.userDomain ?? data.domain,
          companyName: data.companyName,
          website: data.website,
          description: data.description,
          countryCode: selectedCode,
          phoneNumber: data.phoneNumber,
          streetNo: data.streetNo,
          streetAddress: data.streetAddress,
          province: data.province,
          zipCode: data.zipCode,
          country: selectedCountry,
        };
        form.reset(mappedData)
        await update({ ...session, 
          ...session?.user,
          ...session?.client, 
          domain: data.domain,
          companyName: data.companyName,
          website: data.website,       
          description: data.description,
          countryCode: data.countryCode,
          phoneNumber: data.phoneNumber,
          streetNo: data.streetNo,
          streetAddress: data.streetAddress,
          province: data.province,
          zipCode: data.zipCode, 
          country: data.country, 
        });
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
  
    // Call fetchData when the component mounts
    fetchData();
  }, [form, selectedCode, selectedCountry]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('Form submitted:', data);
    console.log("Save client function called");

    // Add this log to check the form state before submitting
    console.log('Form state before submit:', form.formState);

    try {
      const response = await fetch('/api/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyName: data.companyName,
          website: data.website,       
          description: data.description,
          countryCode: data.countryCode,
          phoneNumber: data.phoneNumber,
          streetNo: data.streetNo,
          streetAddress: data.streetAddress,
          province: data.province,
          zipCode: data.zipCode, 
          country: data.country,    
        })
      })

      console.log('Form submission response:', response);

      if (response.ok) {
        toast.success("The client infomation saved successfully.");
        setIsEditMode(true)
      } else {
        console.error("Save failed");
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <section className="flex flex-col w-full">
      {isEditMode ? (
        <div className='w-full'>
          <div className="flex flex-row mx-auto w-full">
            <CompanyInfo formData={formData}/>
          </div>
          <Button
            className='mt-4 text-md px-10'
            onClick={() => setIsEditMode(false)}
          >
            Edit
          </Button>
        </div>
      ) : (
      <div 
      className='flex flex-col mx-auto w-full'
      >
        <div className="flex items-center my-4">
          <HiUserCircle />
          <h2 className="text-xl font-semibold ml-6">Company assets</h2>
        </div>
        <div className="flex items-center">
          <Label className="w-1/2 ml-10">Logo</Label>
          <div className="w-full flex">
            <div className=''>
              {session?.userDomain ? (
                <CldImage
                    width="100"
                    height="100"
                    src={session.userDomain} 
                    alt='Client logo' 
                  />

              ) : (
                <></>
              )}
            </div>
            <div className='w-full mt-6 text-md'>
              <AddLogo  />
            </div>
          </div>
        </div>  
        <Form {...form}>
          <form  onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className="flex items-center my-4">
              <HiNewspaper />
              <h2 className="text-xl font-semibold ml-6">General Information</h2>
            </div>
            <div className="flex flex-col">
              <div className="">
                <FormField
                  control={form.control}
                  name='companyName'
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/2 ml-10">Name</FormLabel>
                      <FormControl className="">
                        <Input placeholder='Enter company name' 
                         {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/2 ml-10">Website</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter website URL' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/2 ml-10">Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type your description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='w-full'>
              <FormField
  control={form.control}
  name='phoneNumber'
  render={({ field }) => (
    <FormItem className="flex items-center">
      <FormLabel className="w-1/2 ml-10">Phone number</FormLabel>
      <div className="w-[100%] flex items-center">
        <FormControl className="w-1/3">
          <CodeSelect
            {...field}
            value={selectedCode}
            onChange={(value) => setSelectedCode(value)}
          />
        </FormControl>
        <FormControl className="w-2/3">
          <Input className='ml-2 w-full' placeholder="Enter phone number" {...field} />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  )}
/>
               </div> 
            </div>
            <div className="flex items-center my-4">
              <HiBuildingOffice />
              <h2 className="text-xl font-semibold ml-6">Location</h2>
            </div>
            <div className="flex flex-col">
              <FormField
                  control={form.control}
                  name='streetNo'
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/2 ml-10">Street number</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter street number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='streetAddress'
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/2 ml-10">Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter street address' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='province'
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/2 ml-10">Province</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter province' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='zipCode'
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/2 ml-10">Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter zip code' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/2 ml-10">Country</FormLabel>
                      <FormControl>
                      <CountrySelect {...field} value={selectedCountry} onChange={(value) => setSelectedCountry(value)}  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="flex items-center">
              <div className="w-1/2 ml-10">
              </div>
              <div className="w-full">
                <Button className='w-full mt-6 text-md' type='submit'>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

        )}
    </section>
  );
};

export default AdminDashboardForm;

// export type FormDataType = z.infer<typeof FormSchema>;