'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/app/components/ui/textarea';
import { useToast } from "@/app/components/ui/use-toast"
import { useEffect, useRef, useState } from "react";
import { CountrySelect } from '@/app/components/common/CountrySelect';
import { CodeSelect } from '@/app/components/common/CodeSelect';
import { useSession } from 'next-auth/react';
import { BookText, Building, ChevronLeft } from 'lucide-react';
import { DashboardFormProps } from '@/lib/interfaces';

const FormSchema = z.object({
  companyName: z.string().min(1, 'Name is required'),
  website: z.string().url('Invalid URL'),
  description: z.string(). max(500, 'Description is too long'),
  countryCode: z.string().min(1, 'Country code is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  streetNo: z.string(),
  streetAddress: z.string(),
  province: z.string(),
  zipCode: z.string(),
  country: z.string().optional(),
  logo: z.string().optional(),
  id: z.string().optional(),
  domain: z.string().optional(),
});


const AdminDashboardForm: React.FC<DashboardFormProps> = ({ setFormData, setIsEditMode }) => {
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
      logo: '',
    },
  });

  const { update, data: session } = useSession();
  const [selectedCode, setSelectedCode] = useState<string>(''); 
  const [selectedCountry, setSelectedCountry] = useState<string>(''); 

  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await fetch('/api/client');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Set form data with fetched values
        setFormData(data)
        // console.log(data, 'Set form data with fetched values');

        setSelectedCode(data.countryCode);
        setSelectedCountry(data.country);
        const mappedData = {
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
        };
        form.reset(mappedData)

      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    // Call fetchData when the component mounts
    fetchData();
  }, [form, selectedCode, selectedCountry, setFormData]);

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
          countryCode: selectedCode,
          phoneNumber: data.phoneNumber,
          streetNo: data.streetNo,
          streetAddress: data.streetAddress,
          province: data.province,
          zipCode: data.zipCode, 
          country: selectedCountry,    
        })
      })
        
        if (response.ok) {
          toast({
            description: "The client information saved successfully.",
          })
          setIsEditMode(false)
          const mappedData = {
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
          };
          form.reset(mappedData)
          await update({ ...session, 
            ...session?.user,
            ...session?.client, 
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
            logo: data.logo,
          });
          window.location.reload();
        } else {
          toast({
            description: "The client information save failed.",
          })
          console.error("Save failed");
        }
      } catch (error) {
        toast({
          description: "The client information save failed.", 
        })
        console.error("Save failed:", error);
      }
  };


  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className="flex items-center my-4">
          <BookText />
          <h2 className="text-xl font-semibold ml-6">General Information</h2>
        </div>
        <div className="flex flex-col">
          
            <FormField
              control={form.control}
              name='companyName'
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2 ml-10">Name</FormLabel>
                    <FormControl className="mb-1 text-sm">
                      <Input placeholder='Enter company name'                        
                      {...field} />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-1/2 ml-10">Website</FormLabel>
                <FormControl>
                  <Input placeholder='Enter website URL'
                  {...field} />
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
                  <Textarea placeholder="Type your description"
                  {...field} />
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
          <Building />
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
                    <Input placeholder='Enter street number'
                        
                        {...field} />
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
                    <Input placeholder='Enter street address'
                      
                        {...field} />
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
                    <Input placeholder='Enter province'
                        
                        {...field} />
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
                    <Input placeholder='Enter zip code'
                      {...field} />
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
        <div className="w-1/2 ml-8">
            <ChevronLeft className='cursor-pointer mt-6'  onClick={() => setIsEditMode(false)} />
          </div>
          <div className="w-full">               
            <Button className='w-full mt-6 text-md' type='submit'>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AdminDashboardForm;

