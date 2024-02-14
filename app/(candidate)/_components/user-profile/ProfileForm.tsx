'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { toast } from 'react-toastify';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import UserProfile from './ProfileTable';
import { useEffect, useState } from "react";
import AddPhoto from '@/app/components/common/AddPhoto';
import { Label } from '@/app/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { UserProps, FormData } from '@/lib/interfaces';


const FormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  image: z.string().url('Invalid image url'),
});


const ProfileForm: React.FC<UserProps> = ({ user }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      image: '',
    },
  });

  const [isEditMode, setIsEditMode] = useState(true);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  console.log(formData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setFormData(data)
        console.log(data.user, 'data user')
        // Set form data with fetched values
        console.log(data, 'data fetch');
  
        const mappedData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        };
        form.reset(mappedData)
        console.log('form reset data', data)
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
  
    // Call fetchData when the component mounts
    fetchData();
  }, [form]);

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
            {user && <UserProfile user={user} formData={formData} />}
          </div>
          <div className="flex items-center">
              <div className="w-1/2 ml-10">
              </div>            
              <div className="w-full">
                <Button
                  className='w-full mt-6 text-md'
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
        {/* <div className="flex items-center my-4">
          <HiUserCircle />
          <h2 className="text-xl font-semibold ml-6">User Information</h2>
        </div> */}
        <div className="flex items-center">
          <Label className="w-1/2 ml-10">Profile image</Label>
          <div className="w-full flex flex-row items-center justify-between align-middle">
            <div className=''>
                <Avatar>
                  <AvatarImage src={formData?.image} className='w-[50px] h-[50px] object-fill' />
                  <AvatarFallback>FN</AvatarFallback>
                </Avatar>
            </div>
            <div className='w-3/4 mt-6 text-md'>
              <AddPhoto  />
            </div>
          </div>
        </div>   
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
