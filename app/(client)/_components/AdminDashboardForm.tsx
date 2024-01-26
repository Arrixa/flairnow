'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { HiBuildingOffice, HiNewspaper } from 'react-icons/hi2';
import { Textarea } from '@/app/components/ui/textarea';

const GeneralInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  website: z.string().url('Invalid URL'),
  description: z.string(),
  countryCode: z.string().length(2, 'Country Code must be 2 characters'),
  phoneNumber: z.string().min(1, 'Phone Number is required'),
});

const LocationSchema = z.object({
  streetNo: z.string(),
  streetAddress: z.string(),
  province: z.string(),
  zipCode: z.string(),
  country: z.string(),
});

const AdminDashboardForm = () => {
  const form = useForm({
    resolver: zodResolver(GeneralInfoSchema),
    defaultValues: {
      name: '',
      website: '',
      description: '',
      countryCode: '',
      phoneNumber: '',
      streetNo: '',
      streetAddress: '',
      province: '',
      zipCode: '',
      country: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Add logic to send the form data to the server
  };

  return (
    <section className="flex flex-col w-full p-4">
      <div 
      className='flex flex-col mx-auto w-full'
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full lg:w-3/4'>
            <div className="flex items-center my-4">
              <HiNewspaper />
              <h2 className="text-xl font-semibold ml-2">General Information</h2>
            </div>
            <div className="flex flex-col">
              <div className="">
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/2 pr-4">Name</FormLabel>
                      <FormControl className="">
                        <Input placeholder='Enter name' {...field} />
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
                    <FormLabel className="w-1/2 pr-4">Website</FormLabel>
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
                    <FormLabel className="w-1/2 pr-4">Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type your description" {...field} />
                      {/* <Input placeholder='Enter description'  /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='countryCode'
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/2 pr-4">Country code</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter country code' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/2 pr-4">Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter phone number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center my-4">
              <HiBuildingOffice />
              <h2 className="text-xl font-semibold ml-2">Location</h2>
            </div>
            <div className="flex flex-col">
              <FormField
                  control={form.control}
                  name='streetNo'
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/2 pr-4">Street number</FormLabel>
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
                      <FormLabel className="w-1/2 pr-4">Street Address</FormLabel>
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
                      <FormLabel className="w-1/2 pr-4">Province</FormLabel>
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
                      <FormLabel className="w-1/2 pr-4">Zip Code</FormLabel>
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
                      <FormLabel className="w-1/2 pr-4">Country</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter country' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="flex items-center">
              <div className="w-1/2 pr-4">
                {/* Empty div to create space for label alignment */}
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
    </section>
  );
};

export default AdminDashboardForm;

