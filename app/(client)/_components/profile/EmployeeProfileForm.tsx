'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from "@/app/components/ui/use-toast"
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { ProfileFormProps } from '@/lib/interfaces';
import { ChevronLeft } from 'lucide-react';

const FormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  image: z.string().optional(),
  id: z.string().optional(),
});

const ProfileForm: React.FC<ProfileFormProps> = ({ formData, setIsEditMode, setFormData, session }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      image: '',
      id: '',
    },
  });

  const { update } = useSession();
  const { toast } = useToast()

  console.log(formData, 'formData from employee profile in form')

  useEffect(() => {
    const mappedData = {
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      email: formData?.email,
      image: formData?.image,
    };
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
        toast({
          description: "The user information saved successfully.",
        })
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
          image: responseData.image,
        });
        setIsEditMode(false)
      } else {
        console.error("Save failed");
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className="flex flex-col">
          <div className="">
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2 ml-4">First name</FormLabel>
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
                  <FormLabel className="w-1/2 ml-4">Last name</FormLabel>
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
                <FormLabel className="w-1/2 ml-4">Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
        </div>
        <div className="flex items-center">
          <div className="w-1/2 ml-4">
            <ChevronLeft className='cursor-pointer mt-6' onClick={() => setIsEditMode(false)} />
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

export default ProfileForm;
