'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import EmployeeProfileTable from './EmployeeProfileTable';
import { useSession } from 'next-auth/react';
import { SessionProps, FormData } from '@/lib/interfaces';
import { UserRoundCheck } from 'lucide-react';

const FormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});


const ProfileForm = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const [isEditMode, setIsEditMode] = useState(true);
  const { update, data: session } = useSession();
  const [formData, setFormData] = useState<FormData>(() => ({
    firstName: session?.user?.firstName || '',
    lastName: session?.user?.lastName || '',
    email: session?.user?.email || '',
    image: session?.user?.image || '',
    id: session?.user.id,
  }));

  console.log(formData)

  useEffect(() => {
    const mappedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };
    console.log(mappedData)
    form.reset(mappedData);
  }, [formData, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        })
      })

      console.log('Form submission response:', response);

      if (response.ok) {
        toast.success("The user infomation saved successfully.");
        const res = await response.json();
        const responseData = res.updatedInfo;
        setFormData(responseData)
        await update({
          ...session,
          ...session?.user,
          id: responseData.id,
          firstName: responseData.firstName,
          lastName: responseData.lastName,
          email: responseData.email,
        });
        setIsEditMode(true)
      } else {
        console.error("Save failed");
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <section className="flex flex-col lg:w-2/3 md:w-10/12 w-full lg:space-x-10 ">
      <div className="flex items-center my-4">
        <UserRoundCheck />
        <h2 className="text-xl font-semibold ml-8">Employee profile information</h2>
      </div>
      {isEditMode ? (
        <div className='w-full'>
          <div className="flex flex-row mx-auto w-full">
            <EmployeeProfileTable formData={formData} />
          </div>
          <div className="lg:w-2/3 md:w-10/12 w-full lg:space-x-10 flex flex-row">
            <div className="w-1/2 lg:mx-14 md-mx-10">
            </div>            
            <div className="w-2/3 md:ml-2">
              <Button
                className='w-full mt-2 text-md'
                onClick={() => setIsEditMode(false)}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      ) : (
      <div 
      className='flex flex-col mx-auto w-full'
      >
        <Form {...form}>
          <form  onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className="flex flex-col">
              <div className="">
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/2 ml-10">First name</FormLabel>
                      <FormControl className="">
                        <Input placeholder='Enter your first name' 
                         {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/2 ml-10">Last name</FormLabel>
                      <FormControl className="">
                        <Input placeholder='Enter your last name' 
                         {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/2 ml-10">Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your email' {...field} />
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

export default ProfileForm;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch data from your API endpoint
  //       const response = await fetch('/api/user');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  
  //       const data = await response.json();
  //       setFormData(data)
  //       console.log(data.user, 'data user')
  //       // Set form data with fetched values
  //       console.log(data, 'data fetch');
  
  //       const mappedData = {
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         email: data.email,
  //       };
  //       form.reset(mappedData)
  //       console.log('form reset data', data)
  //     } catch (error) {
  //       console.error('Error fetching form data:', error);
  //     }
  //   };
  //   // Call fetchData when the component mounts
  //   fetchData();
  // }, [form]);