'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/app/components/ui/textarea';
import { useToast } from "@/app/components/ui/use-toast"
import { useState, useEffect } from "react";
import { CountrySelect } from '@/app/components/common/CountrySelect';
import { CodeSelect } from '@/app/components/common/CodeSelect';
import { useSession } from 'next-auth/react';
import { Label } from '@/app/components/ui/label';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';
import { DashboardFormProps } from '@/lib/interfaces';
import { ChevronLeft } from 'lucide-react';

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
  // id: z.string().optional(),
  // domain: z.string().optional(),
});

// FTM-2 / FTM-20 14. Admin dashboard form

const AdminDashboardForm: React.FC<DashboardFormProps> = ({ setFormData, setIsEditMode, formData }) => {
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
    setSelectedCode(formData.countryCode);
    setSelectedCountry(formData.country);
    const mappedData = {
      companyName: formData.companyName,
      website: formData.website,
      description: formData.description,
      countryCode: formData.countryCode,
      phoneNumber: formData.phoneNumber,
      streetNo: formData.streetNo,
      streetAddress: formData.streetAddress,
      province: formData.province,
      zipCode: formData.zipCode,
      country: formData.country,
    };
    form.reset(mappedData)
  }, [form, formData])


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('Form submitted:', data, selectedCode, selectedCountry);
    console.log("Save client function called");

    // Add this log to check the form state before submitting
    // console.log('Form state before submit:', form.formState);

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
        // FTM-2 / FTM-20 16. Update session & form data
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
      <form  onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5'>
        <CardHeader><CardTitle>General Information</CardTitle></CardHeader>
            <FormField
              control={form.control}
              name='companyName'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4">Name</Label>
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
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Website</Label>
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
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Description</Label>
                <FormControl>
                  <Textarea placeholder="Type your description" className='h-fit'
                  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4">Phone number</Label>
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
        </Card>
        <Card className="md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5">
          <CardHeader><CardTitle>Location</CardTitle></CardHeader>
          <FormField
              control={form.control}
              name='streetNo'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4">Street number</Label>
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
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4">Street Address</Label>
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
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4">Province</Label>
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
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4">Zip Code</Label>
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
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4">Country</Label>
                  <FormControl>
                  <CountrySelect {...field} value={selectedCountry} onChange={(value) => setSelectedCountry(value)}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </Card>
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <ChevronLeft className='cursor-pointer mt-6 mx-4'  onClick={() => setIsEditMode(false)} />
          <Button className='my-4 text-md mx-4' type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminDashboardForm;
